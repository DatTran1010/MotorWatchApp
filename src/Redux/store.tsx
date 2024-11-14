import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducers";
import apiSlice from "./apiSlice";
import appReducer from "./appSlice";


const rootReducer = {
  app: appReducer,
  api: apiSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
