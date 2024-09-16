import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading)
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
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">
        Error loading data: {error.message}
      </p>
    );

  return (
    <div className="container mx-auto px-4 backdrop-blur-sm">
      <div className="text-center my-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse drop-shadow-lg">
          Welcome to Our Store
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mt-4">
          Discover the latest products and deals just for you
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data.map((product, index) => (
            <Product key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;
