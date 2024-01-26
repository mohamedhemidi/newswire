import { PATH } from "constants/environment";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";

const ViewArticle = (id: unknown) => {
  const http = new HTTP();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.GET_ARTICLE,
      });
      const response = await http.GET(`${PATH.fetchArticle}/${id}`);
      if (response) {
        dispatch({
          type: actions.GET_ARTICLE_SUCCESS,
          payload: response,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: actions.GET_ARTICLE_ERROR,
        payload: error,
      });
    }
  };
};

export default ViewArticle;
