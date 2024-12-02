import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt_token"); // Get JWT from cookies
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
      })
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
        Error loading data: {error.message || error}
      </p>
    );

  return (
    <div
      className="rounded-lg shadow-lg bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/wave-gradient-blue-background-modern-design_343694-3806.jpg?t=st=1726540548~exp=1726544148~hmac=4872cd591e58c968c4387dbc1f8c5759b3523815eaa281ec5c7cfc73a3e83fb3&w=1380",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid justify-items-center">
          <div className="text-center my-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 drop-shadow-lg">
              Welcome to Our Store
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 mt-4">
              Discover the latest products and deals just for you
            </p>
          </div>
          <div className="pb-4">
            <span className="inline-block w-40 h-1 bg-red-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-pink-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-purple-500 rounded-full"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            data.map((product, index) => (
              <Product key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
