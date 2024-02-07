import { PATH } from "constants/environment";
import actions from "redux/actions";
import { Dispatch } from "redux";
import http from "lib/httpClient";

const UserProfile = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.USER_PROFILE,
        payload: token,
      });
      const response = await http.GET(PATH.userProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        enableCache: true,
      });
      if (response) {
        dispatch({
          type: actions.USER_PROFILE_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.USER_PROFILE_ERROR,
        payload: error,
      });
    }
  };
};

export default UserProfile;
