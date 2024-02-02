import { PATH } from "constants/environment";
import actions from "redux/actions";
import { Dispatch } from "redux";
import http from "lib/httpClient";

const GetSources = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.GET_SOURCES,
      });
      const response = await http.GET(PATH.fetchSources, { enableCache: true });
      if (response) {
        dispatch({
          type: actions.GET_SOURCES_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.GET_SOURCES_ERROR,
        payload: error,
      });
    }
  };
};

export default GetSources;
