import actions from "redux/actions";

const SettingsReducer = (state = {}, action: SettingsActionProps) => {
  switch (action.type) {
    case actions.UPDATE_SETTINGS:
      return { ...state, loading: true };
    case actions.UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        updated: true,
      };
    case actions.UPDATE_SETTINGS_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
        updated: false,
      };

    default:
      return state;
  }
};

export default SettingsReducer;

export type SettingsActionProps = {
  type: string;
  payload: unknown;
};
