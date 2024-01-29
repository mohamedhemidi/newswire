import { PATH } from "constants/environment";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";

const UserProfile = (token: string) => {
  const http = new HTTP();

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
