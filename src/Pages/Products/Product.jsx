import React, { useState } from "react";
import Modal from "./ProductDetails";

const Product = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            className="w-full h-full object-cover rounded-t-xl"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {product.name}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {product.description}
          </p>
          <h6 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Price Per Unit: ${product.price}
          </h6>
          <h6 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Minimum Order Quantity: {product.minimum_order_quantity}
          </h6>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {product.available_quantity} Items Left
          </p>
        </div>
        <div className="p-6 pt-0 flex justify-between ">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={openModal}
          >
            Details
          </button>

          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Order Now
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
        <img
          className="w-full h-64 object-cover rounded mb-4"
          src={product.image}
          alt={product.name}
        />
        <p className="mb-2">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="mb-2">
          <strong>Price Per Unit:</strong> ${product.price}
        </p>
        <p className="mb-2">
          <strong>Minimum Order Quantity:</strong>{" "}
          {product.minimum_order_quantity}
        </p>
        <p className="mb-2">
          <strong>Available Quantity:</strong> {product.available_quantity}{" "}
          Items Left
        </p>

        {/* <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={closeModal}
        >
          Close
        </button> */}
      </Modal>
    </>
  );
};

export default Product;
