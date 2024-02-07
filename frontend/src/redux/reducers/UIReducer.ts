import { THEME } from "constants/UI";
import actions from "redux/actions";

const initialState = {
  theme: localStorage.getItem(THEME) || "light",
  sidebar_collapsed: false,
  modal_opened: false,
};

const UIReducer = (state = initialState, action: UIActionProps) => {
  switch (action.type) {
    case actions.TOGGLE_THEME:
      localStorage.setItem(THEME, state.theme === "light" ? "dark" : "light");
      return {
        ...state,
        theme: (state.theme = state.theme === "light" ? "dark" : "light"),
      };
    case actions.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar_collapsed: !state.sidebar_collapsed,
      };
    case actions.OPEN_MODAL:
      return {
        ...state,
        modal_opened: true,
      };
    case actions.CLOSE_MODAL:
      return {
        ...state,
        modal_opened: false,
      };
    default:
      return state;
  }
};

export default UIReducer;

export type UIActionProps = {
  type: string;
};
