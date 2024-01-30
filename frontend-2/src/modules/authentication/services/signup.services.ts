import { PATH } from "constants/environment";
import { TCredentials } from "../types/authCredentials";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";
import getCookie from "../utils/getCookie";
import { COOKIE } from "../constants/auth";

const SignupUser = (credentials: TCredentials) => {
  const http = new HTTP();

  const cookie = getCookie.get(COOKIE) as string;

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.SIGNUP_USER,
        payload: credentials,
      });
      await http.GET(PATH.createSession, { withCredentials: true });
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
