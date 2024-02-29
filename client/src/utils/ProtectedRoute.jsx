import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.log("not authorised");
    return <Navigate to="/" />;
  }
  console.log("authorised");
  return <Outlet />;
};

export default ProtectedRoute;
