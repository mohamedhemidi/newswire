import actions from "redux/actions";
import { Dispatch } from "redux";
import { SearchT } from "../types/search";

export const search = ({
  keyword = "",
  sources = [],
  categories = [],
}: SearchT) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.UPDATE_SEARCH_QUERIES,
      payload: { keyword, sources, categories },
    });
  };
};
