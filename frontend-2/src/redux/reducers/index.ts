import { combineReducers } from "redux";
import UIReducer from "./UIReducer";
import LoginReducer from "modules/authentication/reducers/loginReducer";
import SignupReducer from "modules/authentication/reducers/signupReducer";
import UserReducer from "modules/authentication/reducers/userReducer";

const reducers = combineReducers({
  UI: UIReducer,
  login: LoginReducer,
  signup: SignupReducer,
  user: UserReducer,
});

export default reducers;
