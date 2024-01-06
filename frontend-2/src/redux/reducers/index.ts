import { combineReducers } from "redux";
import UIReducer from "./UIReducer";
import LoginReducer from "modules/authentication/reducers/loginReducer";
import SignupReducer from "modules/authentication/reducers/signupReducer";
import UserReducer from "modules/authentication/reducers/userReducer";

import CategoriesReducer from "modules/settings/reducers/categoriesReducer";
import SourcesReducer from "modules/settings/reducers/sourcesReducer";

const reducers = combineReducers({
  UI: UIReducer,
  login: LoginReducer,
  signup: SignupReducer,
  categories: CategoriesReducer,
  sources: SourcesReducer,
  user: UserReducer,
});

export default reducers;
