import { combineReducers } from "redux";
import UIReducer from "./UIReducer"

const reducers = combineReducers({
    UI: UIReducer
})


export default reducers