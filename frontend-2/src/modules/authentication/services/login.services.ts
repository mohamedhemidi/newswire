import { PATH } from "constants/environment";
import { TCredentials } from "../types/authCredentials";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";

const loginUser = (credentials: Pick<TCredentials, "email" | "password">) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.LOGIN_USER,
        payload: credentials,
      });
      const response = await HTTP.POST(PATH.userLogin, credentials);
      const data = await response.json();
      if (data) {
        dispatch({
          type: actions.LOGIN_USER_SUCCESS,
          payload: data,
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

export default loginUser;