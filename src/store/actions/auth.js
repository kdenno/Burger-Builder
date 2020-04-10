import * as Actions from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: Actions.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: Actions.AUTH_SUCCESS,
    token,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: Actions.AUTH_FAIL,
    error: error,
  };
};
export const logOut = () => {
    return {
        type: Actions.AUTH_LOGOUT
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
        dispatch(authSuccess(resData.data.idToken, resData.localId));
        dispatch(triggerExpiryTimer(resData.data.expiryTime));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
