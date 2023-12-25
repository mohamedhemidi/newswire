import { combineReducers } from "redux";
import UIReducer from "./UIReducer";
import LoginReducer from "./loginReducer";
import SignupReducer from "./signupReducer";
import UserReducer from "./userReducer";

const reducers = combineReducers({
  UI: UIReducer,
  login: LoginReducer,
  signup: SignupReducer,
  user: UserReducer,
});

export default reducers;
