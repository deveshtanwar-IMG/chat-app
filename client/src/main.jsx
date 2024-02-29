import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SocketProvider } from "./utils/socketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
