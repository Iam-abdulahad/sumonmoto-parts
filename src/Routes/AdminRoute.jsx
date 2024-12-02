import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const AdminRoute = ({ children }) => {
  const { user, userData, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Optionally display a loading spinner or component while data is being fetched
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData?.role !== "admin") {
    // Redirect to NotFound page if the user is not an admin
    return <Navigate to="/404" replace />;
  }

  // Render the children if the user is authenticated and an admin
  return children;
};

export default AdminRoute;
