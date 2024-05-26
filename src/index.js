import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Provider} from "react-redux";
import store from "./app/store.js";
import ToggleThemeProvider from "../src/utils/ToggleTheme.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
  <ToggleThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ToggleThemeProvider>
  </Provider>
  
);
