import { PATH } from "constants/environment";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";

const GetSources = () => {
  const http = new HTTP();

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
