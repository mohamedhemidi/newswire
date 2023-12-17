import actions from "redux/actions";

const initialState = {
  theme: "light",
  search_modal: false,
};

const UIReducer = (state = initialState, action: UIActionProps) => {
  switch (action.type) {
    case actions.TOGGLE_THEME:
      return {
        ...state,
        theme: (state.theme = state.theme === "light" ? "dark" : "light"),
      };
    default:
      return state;
  }
};

export default UIReducer;

export type UIActionProps = {
  type: string;
};
