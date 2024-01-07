import actions from "redux/actions";

const SourcesReducer = (state = {}, action: SourcesActionProps) => {
  switch (action.type) {
    case actions.GET_SOURCES:
      return { ...state, loading: true };
    case actions.GET_SOURCES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    case actions.GET_SOURCES_ERROR:
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

export default SourcesReducer;

export type SourcesActionProps = {
  type: string;
  payload: unknown;
};
