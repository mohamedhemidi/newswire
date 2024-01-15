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
    case actions.GET_SEARCH_QUERIES:
      return { ...state, query: action.payload };
    case actions.UPDATE_SEARCH_QUERIES:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default SearchReducer;

export type SearchActionProps = {
  type: string;
  payload: unknown;
};
