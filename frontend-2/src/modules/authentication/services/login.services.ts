import { PATH } from "constants/environment";
import { TCredentials } from "../types/authCredentials";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";
import getCookie from "../utils/getCookie";
import { COOKIE } from "../constants/auth";


const LoginUser = (credentials: Pick<TCredentials, "email" | "password">) => {
  const http = new HTTP();

  const cookie = getCookie(COOKIE) as string;


  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.LOGIN_USER,
        payload: credentials,
      });
      await http.GET(PATH.createSession, { withCredentials: true });
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
