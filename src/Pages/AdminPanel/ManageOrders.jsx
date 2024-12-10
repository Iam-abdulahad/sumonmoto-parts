import { useState, useEffect } from "react";
import axios from "axios"; // Use axios for API requests
import Swal from "sweetalert2"; // SweetAlert2 for alerts

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("https://sumonmoto-parts-server.onrender.com/orders"); // Replace with your API endpoint
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle action to update order status
  const handleAction = async (orderId, action) => {
    try {
      const updatedStatus =
        action === "Ship" ? "Shipped" : action === "Deliver" ? "Delivered" : "";

      if (updatedStatus) {
        const response = await axios.put(
          `https://sumonmoto-parts-server.onrender.com/orders/${orderId}`,
          { status: updatedStatus }
        );
        if (response.status === 200) {
          Swal.fire(
            "Success",
            `Order status updated to ${updatedStatus}`,
            "success"
          );
          fetchOrders(); // Refetch orders for UI update
        }
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire("Error", "Failed to update order status", "error");
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://sumonmoto-parts-server.onrender.com/orders/${orderId}`
        );
        if (response.status === 200) {
          Swal.fire("Deleted!", "Order has been deleted.", "success");
          fetchOrders(); // Refetch orders for UI update
        }
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error", "Failed to delete order", "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid justify-items-center">
        <div className="text-center my-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-700">
            Manage Orders
          </h1>
        </div>
        <div className="pb-4">
          <span className="inline-block w-40 h-1 bg-red-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-pink-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-purple-500 rounded-full"></span>
        </div>
      </div>

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
              <tr
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm">
                  {order.orderTime}
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
                  $ {order.totalPrice}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-right">
                  {order.status === "Pending" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(order._id, "Ship");
                      }}
                      className="bg-green-500 text-white py-1 px-3 rounded-full mr-2 hover:bg-green-600 transition duration-200"
                    >
                      Ship
                    </button>
                  )}
                  {order.status === "Shipped" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(order._id, "Deliver");
                      }}
                      className="bg-green-500 text-white py-1 px-3 rounded-full mr-2 hover:bg-green-600 transition duration-200"
                    >
                      Deliver
                    </button>
                  )}

                  {["Pending", "Shipped", "Delivered"].includes(
                    order.status
                  ) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(order._id);
                      }}
                      className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
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

      {/* Modal for showing order details */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto p-8 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Order Details
            </h2>
            <div className="space-y-4">
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>Customer Name:</strong> {selectedOrder.customerName}
              </p>
              <p>
                <strong>Customer Email:</strong> {selectedOrder.customerEmail}
              </p>
              <p>
                <strong>Order Date:</strong> {selectedOrder.orderTime}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Total Amount:</strong> {selectedOrder.totalPrice}
              </p>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <p>
                <strong>Address:</strong> {selectedOrder.shippingInfo}
              </p>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p>{selectedOrder.contactInfo}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
