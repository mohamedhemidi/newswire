import { combineReducers } from "redux";
import UIReducer from "./UIReducer";
import LoginReducer from "modules/authentication/reducers/loginReducer";
import SignupReducer from "modules/authentication/reducers/signupReducer";
import UserReducer from "modules/authentication/reducers/userReducer";

import CategoriesReducer from "modules/news/reducers/categoriesReducer";
import SourcesReducer from "modules/news/reducers/sourcesReducer";
import NewsReducer from "modules/news/reducers/news.reducer";
import ArticleReducer from "modules/news/reducers/article.reducer";

import SettingsReducer from "modules/settings/reducers/settings.reducer";

import SearchReducer from "modules/search/reducers/search.reducer";

const reducers = combineReducers({
  UI: UIReducer,
  login: LoginReducer,
  signup: SignupReducer,
  news: NewsReducer,
  article: ArticleReducer,
  categories: CategoriesReducer,
  sources: SourcesReducer,
  settings: SettingsReducer,
  search: SearchReducer,
  user: UserReducer,
});

export default reducers;
