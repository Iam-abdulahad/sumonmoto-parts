import { useState, useEffect } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    // Implement delete logic
  };

  const handleEdit = (id) => {
    // Implement edit logic
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
          <p className="ml-4 text-blue-500">Loading products...</p>
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
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover"
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
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-500 hover:text-blue-700 mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
