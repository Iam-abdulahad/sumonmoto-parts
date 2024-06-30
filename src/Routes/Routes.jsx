import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import Portfolio from "../Pages/Portfolio/Portfolio";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import SignUp from "../Pages/Login/SignUp/SignUp";

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
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/portfolio",
        element: <Portfolio></Portfolio>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/sign_up",
        element: <SignUp></SignUp>
      },
    ]
  },
]);