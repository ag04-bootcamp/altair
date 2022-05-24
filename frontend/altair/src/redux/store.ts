import { configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import loginReducer from "./login.ts";
// @ts-ignore
import measurementReducer from "./measurements.ts";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    measurement: measurementReducer,
  },
});
