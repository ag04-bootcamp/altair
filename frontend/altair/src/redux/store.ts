import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login.ts";

import measurementReducer from "./measurements.ts";

import filesReducer from "./files.ts"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    measurement: measurementReducer,
    files: filesReducer
  },
});
