import { combineReducers } from "@reduxjs/toolkit";
import formSlice from "../slice/formSlice";

const rootReducer = combineReducers({
  test: formSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
