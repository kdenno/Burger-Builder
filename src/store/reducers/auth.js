import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
        error: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        loading: false,
        error: true,
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
