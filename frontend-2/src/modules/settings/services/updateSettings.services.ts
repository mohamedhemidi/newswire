import { PATH } from "constants/environment";
import actions from "redux/actions";
import { Dispatch } from "redux";
import { AUTH_TOKEN } from "modules/authentication/constants/auth";
import http from "lib/httpClient";
import { getCookie } from "modules/authentication/utils/authHelper";

const UpdateSettings = (data: unknown, cb: () => void) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_SETTINGS,
        payload: data,
      });
      await http.GET(PATH.createSession, { withCredentials: true });
      const cookie = getCookie();
      const response = await http.POST(PATH.updateSettings, {
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": cookie,
        },
        withCredentials: true,
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
