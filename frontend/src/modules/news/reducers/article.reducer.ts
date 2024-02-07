import actions from "redux/actions";

const ArticleReducer = (state = {}, action: ArticleActionProps) => {
  switch (action.type) {
    case actions.GET_ARTICLE:
      return { ...state, loading: true };
    case actions.GET_ARTICLE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    case actions.GET_ARTICLE_ERROR:
      return {
        ...state,
        data: "",
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ArticleReducer;

export type ArticleActionProps = {
  type: string;
  payload: unknown;
};
