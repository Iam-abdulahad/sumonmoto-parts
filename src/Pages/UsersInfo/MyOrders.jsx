// src/components/MyOrders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        // Show error to user using SweetAlert2
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch orders. Please try again later.",
          icon: "error",
          confirmButtonText: "Okay",
          background: "#f8f9fa",
          customClass: {
            title: "text-red-500",
            popup: "border border-red-600",
            confirmButton: "bg-red-500 text-white px-4 py-2 rounded-md",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">My Orders</h1>
      {loading ? (
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 bg-white shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-medium">Order #{order.id}</h2>
                    <p className="text-gray-600">Date: {order.date}</p>
                    <p
                      className={`text-sm ${
                        order.status === "Delivered"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      Status: {order.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{order.total}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Items</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Orders Found
              </h2>
              <p className="text-gray-500">
                You haven't placed any orders yet. Start shopping now and your
                orders will appear here.
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                Shop Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
