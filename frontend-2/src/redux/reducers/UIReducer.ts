import actions from "redux/actions";

const initialState = {
  theme: "light",
  sidebar_collapsed: false,
};

const UIReducer = (state = initialState, action: UIActionProps) => {
  switch (action.type) {
    case actions.TOGGLE_THEME:
      return {
        ...state,
        theme: (state.theme = state.theme === "light" ? "dark" : "light"),
      };
    case actions.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar_collapsed: !state.sidebar_collapsed,
      };
    default:
      return state;
  }
};

export default UIReducer;

export type UIActionProps = {
  type: string;
};
