import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./screens/authenication/Register";
import Login from "./screens/authenication/Login";
import Chat from "./screens/chat/Chat";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/publicRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Routes>
          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Chat />} path="/chat" exact />
          </Route>

          {/* public routes */}
          <Route element={<PublicRoute />}>
            <Route element={<Login />} path="/" exact />
            <Route element={<Register />} path="/register" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
