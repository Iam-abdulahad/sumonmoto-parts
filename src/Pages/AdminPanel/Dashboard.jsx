import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    // Redirect /dashboard to /dashboard/manage_orders by default
    if (location.pathname === "/dashboard") {
      <Navigate to="dashboard/manage_orders" replace />;
    }
  }, [location]);

  // Function to check if the link is active
  const isActiveRoute = (path) => location.pathname.includes(path);

  return (
    <div className="flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="h-screen w-full md:fixed md:top-0 md:left-0 md:w-64 bg-sky-500 text-white">
        <div className="p-4 font-bold text-xl text-center md:text-left">
          Admin Dashboard
        </div>
        <nav className="mt-4">
          <Link
            to="manage_orders"
            className={`block py-2 px-4 ${
              isActiveRoute("manage_orders")
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            Manage Orders
          </Link>
          <Link
            to="manage_users"
            className={`block py-2 px-4 ${
              isActiveRoute("manage_users")
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            Manage Users
          </Link>
          <Link
            to="manage_products"
            className={`block py-2 px-4 ${
              isActiveRoute("manage_products")
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            Manage Products
          </Link>
          <Link
            to="add_product"
            className={`block py-2 px-4 ${
              isActiveRoute("add_product") ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            Add New Product
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded shadow mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            Dashboard Overview
          </h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>Admin Name</span>
            <button className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded">
              Logout
            </button>
          </div>
        </header>
        {/* Nested Route Content */}
        <Outlet /> {/* This will render nested routes here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
