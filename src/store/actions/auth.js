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
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: ActionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logOut = () => {
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export const triggerExpiryTimer = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
            
        }, expiryTime * 1000);
    }

}

// Trigger Async
export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByq5J5WoJqX6SnjN67dCHrQaLTJFHxHkE";
    if(!isSignUp) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByq5J5WoJqX6SnjN67dCHrQaLTJFHxHkE";

    }
    const loginData = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post( url,loginData)
      .then((resData) => {
        console.log(resData.data.localId);
        dispatch(authSuccess(resData.data.idToken, resData.data.localId));
        dispatch(triggerExpiryTimer(resData.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
