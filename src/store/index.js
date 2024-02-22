// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

export { store }; // Exporting the 'store' object
