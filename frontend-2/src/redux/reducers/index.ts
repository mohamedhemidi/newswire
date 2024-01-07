import { combineReducers } from "redux";
import UIReducer from "./UIReducer";
import LoginReducer from "modules/authentication/reducers/loginReducer";
import SignupReducer from "modules/authentication/reducers/signupReducer";
import UserReducer from "modules/authentication/reducers/userReducer";

import CategoriesReducer from "modules/news/reducers/categoriesReducer";
import SourcesReducer from "modules/news/reducers/sourcesReducer";

import SettingsReducer from "modules/settings/reducers/settings.reducer";

const reducers = combineReducers({
  UI: UIReducer,
  login: LoginReducer,
  signup: SignupReducer,
  categories: CategoriesReducer,
  sources: SourcesReducer,
  settings: SettingsReducer,
  user: UserReducer,
});

export default reducers;
