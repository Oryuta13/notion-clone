import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import memoReducer from "./features/memoSlice";

const rootReducer = combineReducers({
  user: userReducer,
  memo: memoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
