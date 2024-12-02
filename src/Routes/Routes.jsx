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
import AdminDashboard from "../Pages/AdminPanel/Dashboard";
import AdminRoute from "./AdminRoute";
import MakeOrder from "../Pages/Products/MakeOrder";
import ManageOrders from "../Pages/AdminPanel/ManageOrders";
import ManageProducts from "../Pages/AdminPanel/ManageProducts";
import AddProduct from "../Pages/AdminPanel/AddProduct";
import ManageUsers from "../Pages/AdminPanel/ManageUsers";

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
        path: "/make_order/:productId",
        element: <MakeOrder />,
      },
      {
        path: "/portfolio",
        element: <ManageUsers></ManageUsers>,
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
        path: "/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          {
            path: "manage_orders",
            element: <ManageOrders></ManageOrders>,
          },
          {
            path: "manage_users",
            element: <ManageUsers></ManageUsers> ,
          },
          {
            path: "manage_products",
            element: <ManageProducts></ManageProducts>,
          },
          {
            path: "add_product",
            element: <AddProduct></AddProduct>,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);
