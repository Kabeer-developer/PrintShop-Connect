import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./slices/storeSlice";
import uploadSlice from "./slices/uploadSlice";

const store = configureStore({
  reducer: {
    storeAuth: storeSlice,
    uploads: uploadSlice,
  },
});

export default store;
