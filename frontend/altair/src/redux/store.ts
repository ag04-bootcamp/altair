import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import loginReducer from "./login.ts";

import measurementReducer from "./measurements.ts";

import filesReducer from "./files.ts"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    measurement: measurementReducer,
    files: filesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store)
export { persistor }