import { PATH } from "constants/environment";
import { TCredentials } from "../types/authCredentials";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";

const LoginUser = (credentials: Pick<TCredentials, "email" | "password">) => {
  
  const http = new HTTP();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.LOGIN_USER,
        payload: credentials,
      });
      const response = await http.POST(PATH.userLogin, credentials);
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
