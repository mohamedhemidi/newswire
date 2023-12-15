import { configureStore } from "reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import UIReducer from "reducers/UIReducer";
import newsReducer from "reducers/NewsReducer";
import userReducer from "reducers/UserReducer";
import settingsReducer from "reducers/SettingsReducer";
import searchReducer from "reducers/SearchReducer";

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
