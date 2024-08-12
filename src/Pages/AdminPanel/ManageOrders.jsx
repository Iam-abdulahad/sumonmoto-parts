// src/components/ManageOrders.js
import { useState } from "react";

const ManageOrders = () => {
  // Sample data; in a real scenario, this data would come from your backend or state management.
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      orderDate: "2024-08-01",
      status: "Pending",
      totalAmount: "$100",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      orderDate: "2024-08-03",
      status: "Shipped",
      totalAmount: "$150",
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      orderDate: "2024-08-05",
      status: "Delivered",
      totalAmount: "$200",
    },
    // More orders...
  ]);

  // Function to handle actions (e.g., update status)
  const handleAction = (orderId, action) => {
    // Implement action logic (e.g., updating order status)
    console.log(`Action ${action} taken on order ${orderId}`);

    // Update order status based on action
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status:
                action === "Ship"
                  ? "Shipped"
                  : action === "Deliver"
                  ? "Delivered"
                  : order.status,
            }
          : order
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Order ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Customer Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Order Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                Total Amount
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  {order.id}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  {order.totalAmount}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-right">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleAction(order.id, "Ship")}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Ship
                    </button>
                  )}
                  {order.status === "Shipped" && (
                    <button
                      onClick={() => handleAction(order.id, "Deliver")}
                      className="text-yellow-600 hover:text-yellow-900 mr-4"
                    >
                      Deliver
                    </button>
                  )}
                  {order.status === "Delivered" && (
                    <button
                      onClick={() => handleAction(order.id, "Delete")}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
