import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: false,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: false,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};
export default reducer;
