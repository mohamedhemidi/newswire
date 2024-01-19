import actions from "redux/actions";
import { Dispatch } from "redux";

export const toggleTheme = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.TOGGLE_THEME
    });
  };
};
export const toggleSidebar = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.TOGGLE_SIDEBAR
    });
  };
};
export const openModal = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.OPEN_MODAL
    });
  };
};
export const closeModal = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.CLOSE_MODAL
    });
  };
};
