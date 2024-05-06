import { configureStore } from "@reduxjs/toolkit";
import jobDataSlice from "../jobSlice";

export default configureStore({
    reducer: {
      jobData: jobDataSlice
    },
  })