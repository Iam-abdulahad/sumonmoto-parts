import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Portfolio from "../Pages/Portfolio/Portfolio";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import SignUp from "../Pages/Login/SignUp/SignUp";
import Products from "../Pages/Products/Products";
import NotFound from "../Pages/NotFound/NotFound";
import ProfilePage from "../Pages/UsersInfo/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/products",
        element: <Products></Products>
      },
      {
        path: "/portfolio",
        element: <Portfolio></Portfolio>
      },
      {
        path: "/profile",
        element: <ProfilePage></ProfilePage>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/sign_up",
        element: <SignUp></SignUp>
      },
      {
        path: "*",
        element: <NotFound></NotFound>
      },
    ]
  },
]);