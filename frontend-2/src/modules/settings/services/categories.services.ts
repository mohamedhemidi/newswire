import { PATH } from "constants/environment";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";

const GetCategories = () => {
  const http = new HTTP();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.GET_CATEGORIES,
      });
      const response = await http.GET(PATH.fetchCategories);
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
