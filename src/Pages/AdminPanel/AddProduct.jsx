// src/pages/AddProduct.js
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    available_available_quantity: "",
    minimum_order_available_available_quantity: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        productData
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setProductData({
          name: "",
          price: "",
          available_available_quantity: "",
          minimum_order_available_available_quantity: "",
          description: "",
          image: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Failed to add product",
        icon: "error",
        confirmButtonText: "OK",
      });

      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 p-4 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Add New Product
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={productData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={productData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="available_quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Available Quantity
          </label>
          <input
            type="number"
            name="available_quantity"
            id="available_quantity"
            value={productData.available_quantity}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="minimum_order_quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Order Quantity
          </label>
          <input
            type="number"
            name="minimum_order_quantity"
            id="minimum_order_quantity"
            value={productData.minimum_order_quantity}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={productData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            name="image"
            id="image"
            value={productData.imageUrl}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
