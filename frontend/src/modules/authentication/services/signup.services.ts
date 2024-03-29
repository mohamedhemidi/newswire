import { PATH } from "constants/environment";
import { TCredentials } from "../types/authCredentials";
import actions from "redux/actions";
import { Dispatch } from "redux";
import { getCookie } from "../utils/authHelper";
import http from "lib/httpClient";

const SignupUser = (credentials: TCredentials) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.SIGNUP_USER,
        payload: credentials,
      });
      await http.GET(PATH.createSession, { withCredentials: true });
      const cookie = getCookie();
      const response = await http.POST(PATH.userSignup, {
        body: credentials,
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": cookie,
        },
      });
      if (response) {
        dispatch({
          type: actions.SIGNUP_USER_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.SIGNUP_USER_ERROR,
        payload: error,
      });
    }
  };
};

export default SignupUser;
