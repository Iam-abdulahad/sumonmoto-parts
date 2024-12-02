import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
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
          const response = await fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete product");
          }
          setProducts(products.filter((product) => product._id !== id));
          Swal.fire("Deleted!", "The product has been deleted.", "success");
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

  const handleEdit = (id) => {
    Swal.fire({
      title: "Edit Product",
      html: `
        <input id="name" class="swal2-input" placeholder="Name" />
        <input id="price" class="swal2-input" placeholder="Price" type="number" />
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const price = Swal.getPopup().querySelector("#price").value;
        if (!name || !price) {
          Swal.showValidationMessage(`Please enter both name and price`);
        }
        return { name, price };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { name, price } = result.value;
        try {
          const response = await fetch(`http://localhost:5000/products/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price }),
          });
          if (!response.ok) {
            throw new Error("Failed to update product");
          }
          const updatedProduct = await response.json();
          setProducts(
            products.map((product) =>
              product._id === id ? { ...product, ...updatedProduct } : product
            )
          );
          Swal.fire("Updated!", "The product has been updated.", "success");
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

      {/* Loading State */}
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

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Products Table */}
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
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="text-blue-500 hover:text-blue-700 mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700 mx-2"
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
