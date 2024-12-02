import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const UsersRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export default UsersRoute;
