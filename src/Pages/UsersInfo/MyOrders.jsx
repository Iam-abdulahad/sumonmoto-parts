import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../Firebase/firebase.config";

const auth = getAuth(app);

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await axios.get("http://localhost:5000/orders");
        const userOrders = response.data
          .filter((order) => order.customerEmail === user.email) // Filter by logged-in user's email
          .map((order, index) => ({
            id: index + 1,
            orderId: order.orderId,
            productName: order.productName,
            quantity: order.quantity,
            price: `$${order.price.toFixed(2)}`,
            totalPrice: `$${order.totalPrice.toFixed(2)}`,
            customerName: order.customerName,
            shippingInfo: order.shippingInfo,
            contactInfo: order.contactInfo,
            orderTime: new Date(order.orderTime).toLocaleDateString(),
            status: order.status || "Pending",
          }));

        setOrders(userOrders);
      } catch (error) {
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
  }, [user]);

  return (
    <div className="backdrop-blur-sm">
      <div className="container mx-auto p-6">
        <div className="grid justify-items-center">
          <div className="text-center my-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-700 drop-shadow-lg">
              Manage Orders
            </h1>
          </div>
          <div className="pb-4">
            <span className="inline-block w-40 h-1 bg-red-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-pink-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-purple-500 rounded-full"></span>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border-l-4 border-blue-500 rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Order #{order.orderId}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Placed on: {order.orderTime}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          order.status === "Delivered"
                            ? "text-green-500"
                            : order.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-500"
                        }`}
                      >
                        Status: {order.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-800">
                        Total: {order.totalPrice}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Product Details
                    </h3>
                    <div className="text-gray-600">
                      <p>Product Name: {order.productName}</p>
                      <p>Quantity: {order.quantity}</p>
                      <p>Price per Unit: {order.price}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Customer Details
                    </h3>
                    <p className="text-gray-600">Name: {order.customerName}</p>
                    <p className="text-gray-600">
                      Shipping Info: {order.shippingInfo}
                    </p>
                    <p className="text-gray-600">
                      Contact: {order.contactInfo}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Orders Found
                </h2>
                <p className="text-gray-500">
                  You have not placed any orders yet. Explore our products and
                  place your first order!
                </p>
                <button className="mt-4 px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  Shop Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
