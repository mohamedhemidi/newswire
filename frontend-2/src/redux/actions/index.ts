import auth_actions from "modules/authentication/actions";
import news_actions from "modules/news/actions";
import settings_actions from "modules/settings/actions";
import search_actions from "modules/search/actions";

export default {
  TOGGLE_THEME: "TOGGLE_THEME",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",

  ...auth_actions,
  ...news_actions,
  ...settings_actions,
  ...search_actions,
};
