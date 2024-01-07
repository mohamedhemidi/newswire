import actions from "redux/actions";


const CategoriesReducer = (
  state = {},
  action: CategoriesActionProps
) => {
  switch (action.type) {
    case actions.GET_CATEGORIES:
      return { ...state, loading: true };
    case actions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    case actions.GET_CATEGORIES_ERROR:
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

export default CategoriesReducer;

export type CategoriesActionProps = {
  type: string;
  payload: unknown;
};
