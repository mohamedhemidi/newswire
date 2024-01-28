import { PATH } from "constants/environment";
import { TCredentials } from "../types/authCredentials";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";

const SignupUser = (credentials: TCredentials) => {
  const http = new HTTP();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.SIGNUP_USER,
        payload: credentials,
      });
      const response = await http.POST(PATH.userSignup, {
        headers: credentials,
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
