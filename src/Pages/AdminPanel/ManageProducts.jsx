import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleInput, setVisibleInput] = useState(null);
  const [quantityInputs, setQuantityInputs] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://sumonmoto-parts-server.onrender.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantityInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddQuantity = async (id) => {
    const quantityToAdd = parseInt(quantityInputs[id], 10);

    if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Quantity",
        text: "Please enter a valid positive number.",
      });
      return;
    }

    try {
      const response = await fetch(`https://sumonmoto-parts-server.onrender.com/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: quantityToAdd, action: "add" }),
      });

      const data = await response.json();
      Swal.fire("Success", data.message, "success");
      await fetchProducts(); // Refresh products
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const toggleInputVisibility = (id) => {
    setVisibleInput((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://sumonmoto-parts-server.onrender.com/products/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete product");
          }
          Swal.fire("Deleted!", "The product has been deleted.", "success");
          await fetchProducts(); // Refetch products after deletion
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

      {loading && (
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
      )}

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Available Quantity</th>
                <th className="py-2 px-4 border-b">Minimum Order Quantity</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b text-center">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">
                    {product.available_quantity}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {product.minimum_order_quantity}
                  </td>
                  <td className="py-2 px-4 border-b space-y-2">
                    {visibleInput === product._id ? (
                      <>
                        <input
                          type="number"
                          min="1"
                          value={quantityInputs[product._id] || ""}
                          onChange={(e) =>
                            handleQuantityChange(product._id, e.target.value)
                          }
                          placeholder="Add Quantity"
                          className="border border-gray-300 p-1 rounded w-20 text-center"
                        />
                        <button
                          onClick={() => handleAddQuantity(product._id)}
                          className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition duration-200"
                        >
                          Confirm
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleInputVisibility(product._id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200"
                      >
                        Add Quantity
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
