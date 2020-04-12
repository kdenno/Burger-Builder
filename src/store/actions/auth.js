import * as ActionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: ActionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: ActionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userId");
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
};

export const triggerExpiryTimer = (expiryTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expiryTime * 1000);
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: ActionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
// Auto Login
export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expiryDate = new Date(localStorage.getItem("expiryDate"));
      const userId = localStorage.getItem("userId");
      if (expiryDate <= new Date()) {
        dispatch(logOut());
      } else {
        // user is logged in, dispatch auth success
        dispatch(authSuccess(token, userId));
        // now that we've triggered a new login, we have to re-trigger a new timer
        dispatch(triggerExpiryTimer( (expiryDate.getTime() - new Date().getTime()) / 1000  ));
      }
    }
  };
};

// Trigger Async
export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByq5J5WoJqX6SnjN67dCHrQaLTJFHxHkE";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByq5J5WoJqX6SnjN67dCHrQaLTJFHxHkE";
    }
    const loginData = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(url, loginData)
      .then((resData) => {
        const expiryDate = new Date(
          new Date().getTime() + resData.data.expiresIn * 1000
        ); // convert expiration time into date

        // persist user data to LS
        localStorage.setItem("token", resData.data.idToken);
        localStorage.setItem("expiryDate", expiryDate);
        localStorage.setItem("userId", resData.data.localId);
        dispatch(authSuccess(resData.data.idToken, resData.data.localId));
        dispatch(triggerExpiryTimer(resData.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
