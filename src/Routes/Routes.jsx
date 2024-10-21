import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import SignUp from "../Pages/Login/SignUp/SignUp";
import Products from "../Pages/Products/Products";
import NotFound from "../Pages/NotFound/NotFound";
import ProfilePage from "../Pages/UsersInfo/ProfilePage";
import AddReview from "../Pages/Home/CustomerReview/AddReview";
import MyOrders from "../Pages/UsersInfo/MyOrders";
import UsersPage from "../Pages/AdminPanel/Users";
import AdminDashboard from "../Pages/AdminPanel/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/portfolio",
        element: <UsersPage></UsersPage>
      },
      {
        path: "/profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "/orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/add_review",
        element: <AddReview></AddReview>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign_up",
        element: <SignUp></SignUp>,
      },
      {
        path: "dashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);
