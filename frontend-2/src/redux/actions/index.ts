import auth_actions from "modules/authentication/actions";
import settings_actions from "modules/settings/actions";

export default {
  TOGGLE_THEME: "TOGGLE_THEME",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",

  ...auth_actions,
  ...settings_actions
};
