// Testing Redux. since reducers are pure function all we have to do is test input-output
import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer tests", () => {
  it("should return initial state passed and invalid action type", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: false,
          authRedirectPath: "/",
        },
        { type: actionTypes.AUTH_SUCCESS, idToken: "some-token", userId: "some-id" }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-id",
      loading: false,
      error: false,
      authRedirectPath: "/",
    });
  });
});
