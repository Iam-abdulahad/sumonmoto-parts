import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../Firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const auth = getAuth(app);

const MakeOrder = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [shippingInfo, setShippingInfo] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Guest User",
          email: currentUser.email || "No Email",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!productId) {
      Swal.fire({
        icon: "error",
        title: "Invalid Product ID",
        text: "The product ID is missing or invalid.",
      });
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `https://sumonmoto-parts-server.onrender.com/make_order/${productId}`
        );
        setProductData(response.data);
        setOrderQuantity(response.data.minimum_order_quantity || 1);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleOrder = async () => {
    if (orderQuantity < productData.minimum_order_quantity) {
      Swal.fire({
        icon: "error",
        title: "Invalid Order Quantity",
        text: `Minimum order quantity is ${productData.minimum_order_quantity}`,
      });
      return;
    }

    const totalPrice = productData.price * orderQuantity;

    // Generate a unique order ID
    const generateOrderId = () => {
      const timestamp = Date.now(); // Current timestamp
      const randomPart = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
      return Number(`${timestamp}${randomPart}`);
    };

    const orderId = generateOrderId();

    const orderData = {
      orderId,
      productName: productData.name,
      price: productData.price,
      totalPrice: totalPrice,
      quantity: orderQuantity,
      customerName: user?.name || "Anonymous",
      customerEmail: user?.email || "No Email Provided",
      shippingInfo,
      contactInfo,
      orderTime: new Date().toISOString(),
      status: "Pending",
    };

    try {
      // Send the order data to the server
      await axios.post("https://sumonmoto-parts-server.onrender.com/orders", orderData);

      // Deduct the ordered quantity from the available stock
      await axios.patch(`https://sumonmoto-parts-server.onrender.com/products/${productId}`, {
        quantity: orderQuantity,
        action: "deduct", // Specify the action
      });

      // Show success message and navigate after user acknowledges
      Swal.fire({
        icon: "success",
        title: "Order Confirmed",
        text: "Your order has been placed successfully!",
      }).then(() => {
        setOrderQuantity(productData.minimum_order_quantity); // Reset form
        setShippingInfo("");
        setContactInfo("");
        navigate("/orders"); // Redirect to the orders page
      });
    } catch (error) {
      console.error("Error placing the order:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to place the order. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: errorMessage,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
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
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 lg:p-12">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">
          Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={productData.image}
              alt={productData.name}
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Product Name:</span>{" "}
              {productData.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Price:</span> ${productData.price}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Minimum Order Quantity:</span>{" "}
              {productData.minimum_order_quantity}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Available Quantity:</span>{" "}
              {productData.available_quantity}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Info */}
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </div>

          {/* Order Quantity */}
          <div>
            <label
              htmlFor="minimum_order_quantity"
              className="block text-gray-700 font-medium mb-2"
            >
              Order Quantity
            </label>
            <input
              type="number"
              id="minimum_order_quantity"
              className="w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              min={productData.minimum_order_quantity}
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Info */}
          <div>
            <label
              htmlFor="shipping"
              className="block text-gray-700 font-medium mb-2"
            >
              Shipping Info
            </label>
            <textarea
              id="shipping"
              className="w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              rows="3"
              value={shippingInfo}
              onChange={(e) => setShippingInfo(e.target.value)}
            ></textarea>
          </div>

          {/* Contact Info */}
          <div>
            <label
              htmlFor="contact"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Info
            </label>
            <textarea
              type="text"
              id="contact"
              className="w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              rows="3"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleOrder}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 max-w-xs"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeOrder;
