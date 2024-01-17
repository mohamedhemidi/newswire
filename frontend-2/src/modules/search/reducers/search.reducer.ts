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
      console.log("FROM REDUCER====", action.payload);
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default SearchReducer;

export type SearchActionProps = {
  type: string;
  payload: {
    keyword: string[];
    sources: string[];
    categories: string[];
  };
};
