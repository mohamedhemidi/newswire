import { PATH } from "constants/environment";
import HTTP from "utils/httpClient";
import actions from "redux/actions";
import { Dispatch } from "redux";
import { AUTH_TOKEN } from "constants/auth";

const GetNews = (query: unknown, page: number = 1) => {
  const http = new HTTP();
  const token = localStorage.getItem(AUTH_TOKEN);
  const url = `${PATH.fetchNews}?page=${page}`;

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.GET_NEWS,
      });
      const response = await http.POST(url, query, {
        Authorization: `Bearer ${token}`,
      });
      if (response) {
        dispatch({
          type: actions.GET_NEWS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.GET_NEWS_ERROR,
        payload: error,
      });
    }
  };
};

export default GetNews;
