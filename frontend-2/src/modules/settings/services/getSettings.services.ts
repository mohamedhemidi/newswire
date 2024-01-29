import { PATH } from "constants/environment";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";
import { AUTH_TOKEN } from "modules/authentication/constants/auth";

const getSettings = () => {
  const http = new HTTP();

  const token = localStorage.getItem(AUTH_TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.GET_SETTINGS,
      });
      const response = await http.GET(PATH.getSettings, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        dispatch({
          type: actions.GET_SETTINGS_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.GET_SETTINGS_ERROR,
        payload: error,
      });
    }
  };
};

export default getSettings;
