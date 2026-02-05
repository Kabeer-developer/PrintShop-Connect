import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice";
import uploadReducer from "./slices/uploadSlice";

const store = configureStore({
  reducer: {
    store: storeReducer,
    uploads: uploadReducer,
  },
});

export default store;
