import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.css";
import App from "./app";
import AuthService from "./service/auth_service";
import AppIndex from "./appIndex";

const authService = new AuthService();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App authService={authService} />
  // <AppIndex authService={authService} />
  // </React.StrictMode>
);
