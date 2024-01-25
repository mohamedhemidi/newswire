import actions from "redux/actions";

const SettingsReducer = (state = {}, action: SettingsActionProps) => {
  switch (action.type) {
    case actions.GET_SETTINGS:
      return { ...state, loading: true };
    case actions.GET_SETTINGS_SUCCESS:
      return { ...state, settings: action.payload, loading: false };
    case actions.GET_SETTINGS_ERROR:
      return { ...state, loading: false };
    case actions.UPDATE_SETTINGS:
      return { ...state, loading: true };
    case actions.UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case actions.UPDATE_SETTINGS_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
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
