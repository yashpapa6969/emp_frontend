import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";
import authReducer from "./slice/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Importing 'lib/storage' instead of 'es/storage/session'

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    auth: persistedAuthReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
