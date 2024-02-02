import { PATH } from "constants/environment";
import actions from "redux/actions";
import { Dispatch } from "redux";
import { AUTH_TOKEN } from "modules/authentication/constants/auth";
import http from "lib/httpClient";
import { getCookie } from "modules/authentication/utils/authHelper";

const GetNews = (query: unknown, page: number = 1) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const cookie = getCookie();
  const url = `${PATH.fetchNews}?page=${page}`;

  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actions.GET_NEWS,
      });
      const response = await http.POST(url, {
        body: query,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": cookie,
        },
      });
      if (response) {
        dispatch({
          type: actions.GET_NEWS_SUCCESS,
          payload: response.data,
        });
      }
      return response;
    } catch (error) {
      dispatch({
        type: actions.GET_NEWS_ERROR,
        payload: error,
      });
    }
  };
};

export default GetNews;
