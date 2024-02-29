import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  let authToken = localStorage.getItem("authToken");
  if (authToken) {
    console.log("authorised");
    return <Navigate to="/chat" />;
  }
  console.log("not authorised");
  return <Outlet />;
};

export default PublicRoute;
