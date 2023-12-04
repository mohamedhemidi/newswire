import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import UIReducer from "@Reducers/UIReducer";
import newsReducer from "@Reducers/NewsReducer";
import userReducer from "@Reducers/UserReducer";
import settingsReducer from "@Reducers/SettingsReducer";
import searchReducer from "@Reducers/SearchReducer";

export const store = configureStore({
  reducer: {
    UI: UIReducer,
    news: newsReducer,
    users: userReducer,
    settings: settingsReducer,
    search: searchReducer,
  },
  middleware: [thunkMiddleware],
});
