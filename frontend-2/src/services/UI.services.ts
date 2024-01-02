import actions from "redux/actions";
import { Dispatch } from "redux";

export const toggleTheme = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.TOGGLE_THEME
    });
  };
};
