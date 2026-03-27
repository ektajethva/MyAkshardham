import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = ({ isAdmin }) => {
  // Check if user is logged in AND is an admin
  // You can get this info from localStorage, context, or global state
  const token = localStorage.getItem("token"); // example auth token
  const role = localStorage.getItem("role"); // example: "admin" or "user"

  if (!token || role !== "admin") {
    // If not logged in or not admin, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If admin, render the child routes
  return <Outlet />;
};

export default ProtectedAdminRoute;