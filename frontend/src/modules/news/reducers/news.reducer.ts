import actions from "redux/actions";

const NewsReducer = (state = {}, action: NewsActionProps) => {
  switch (action.type) {
    case actions.GET_NEWS:
      return { ...state, loading: true };
    case actions.GET_NEWS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    case actions.GET_NEWS_ERROR:
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

export default NewsReducer;

export type NewsActionProps = {
  type: string;
  payload: unknown;
};
