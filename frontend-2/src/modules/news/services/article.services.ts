import { PATH } from "constants/environment";
import actions from "redux/actions";
import { Dispatch } from "redux";
import http from "lib/httpClient";

const ViewArticle = (id: unknown) => {

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
