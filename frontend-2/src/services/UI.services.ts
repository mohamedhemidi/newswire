import actions from "redux/actions";
import { Dispatch } from "redux";
import { UIActionProps } from "redux/reducers/UIReducer";

export const toggleTheme = () => {
  return (dispatch: Dispatch<UIActionProps>) => {
    dispatch({
      type: actions.TOGGLE_THEME
    });
  };
};
