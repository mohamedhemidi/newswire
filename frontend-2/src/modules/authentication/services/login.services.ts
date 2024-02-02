import { PATH } from "constants/environment";
import { TCredentials } from "../types/authCredentials";
import actions from "redux/actions";
import { Dispatch } from "redux";
import { getCookie } from "modules/authentication/utils/authHelper";
import http from "lib/httpClient";

const LoginUser = (credentials: Pick<TCredentials, "email" | "password">) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.LOGIN_USER,
        payload: credentials,
      });
      await http.GET(PATH.createSession, { withCredentials: true });
      const cookie = getCookie();
      const response = await http.POST(PATH.userLogin, {
        body: credentials,
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": cookie,
        },
      });
      if (response) {
        dispatch({
          type: actions.LOGIN_USER_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.LOGIN_USER_ERROR,
        payload: error,
      });
    }
  };
};

export default LoginUser;
