import React from "react";
import UsersPage from "./Users";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-900 text-white">
        <div className="p-4 font-bold text-xl text-center">Admin Dashboard</div>
        <nav className="mt-4">
          <a href="#orders" className="block py-2 px-4 hover:bg-blue-700">
            Manage Orders
          </a>
          <a href="#users" className="block py-2 px-4 hover:bg-blue-700">
            Manage Users
          </a>
          <a href="#products" className="block py-2 px-4 hover:bg-blue-700">
            Manage Products
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Nav */}
        <header className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <span>Admin Name</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Sections */}
        <section
          id="stats"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
            <p className="text-4xl">350</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <p className="text-4xl">150</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <p className="text-4xl">120</p>
          </div>
        </section>

        {/* Manage Orders */}
        <section id="orders" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            {/* Orders table */}
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">#001</td>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">Processing</td>
                  <td className="px-4 py-2">$500</td>
                  <td className="px-4 py-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                      Reject
                    </button>
                  </td>
                </tr>
                {/* Additional rows */}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manage Users */}
        <section id="users" className="mb-6">
          <UsersPage></UsersPage>
        </section>

        {/* Manage Products */}
        <section id="products" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
          {/* Similar table structure for products */}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
