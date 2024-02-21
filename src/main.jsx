// main.jsx

import React from "react";
import ReactDOM from "react-dom";
import WrappedApp from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import { createRoot } from "react-dom/client";
 // Import store and persistor from store.js

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <React.StrictMode>
          <WrappedApp />
        </React.StrictMode>
      </Router>
    </PersistGate>
  </Provider>
);
