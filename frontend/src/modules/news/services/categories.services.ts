import { PATH } from "constants/environment";
import actions from "redux/actions";
import { Dispatch } from "redux";
import http from "lib/httpClient";

const GetCategories = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.GET_CATEGORIES,
      });
      const response = await http.GET(PATH.fetchCategories, {
        enableCache: true,
      });
      if (response) {
        dispatch({
          type: actions.GET_CATEGORIES_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.GET_CATEGORIES_ERROR,
        payload: error,
      });
    }
  };
};

export default GetCategories;
