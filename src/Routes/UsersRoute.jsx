import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const UsersRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default UsersRoute;
