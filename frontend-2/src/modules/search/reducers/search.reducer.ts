import actions from "redux/actions";

const initialState = {
  query: {
    keyword: "",
    sources: "",
    categories: "",
  },
};

const SearchReducer = (state = initialState, action: SearchActionProps) => {
  switch (action.type) {
    case actions.UPDATE_SEARCH_QUERIES:
      return {
        ...state,
        query: {
          ...state.query,
          keyword: action.payload.keyword ? action.payload.keyword : "",
          sources: action.payload.sources ? action.payload.sources : "",
          categories: action.payload.categories
            ? action.payload.categories
            : "",
        },
      };
    default:
      return state;
  }
};

export default SearchReducer;

export type SearchActionProps = {
  type: string;
  payload: {
    [key: string]: string[];
  };
};
