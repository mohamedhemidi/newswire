import { PATH } from "constants/environment";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";
import { AUTH_TOKEN } from "constants/auth";

const UpdateSettings = (data: unknown, cb: () => void) => {
  const http = new HTTP();

  const token = localStorage.getItem(AUTH_TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_SETTINGS,
        payload: data,
      });
      const response = await http.POST(PATH.updateSettings, {
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        dispatch({
          type: actions.UPDATE_SETTINGS_SUCCESS,
          payload: response,
        });
        cb();
      }
    } catch (error) {
      dispatch({
        type: actions.UPDATE_SETTINGS_ERROR,
        payload: error,
      });
    }
  };
};

export default UpdateSettings;
