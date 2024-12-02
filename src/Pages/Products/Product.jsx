import { useState } from "react";
import Modal from "./ProductDetails";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const {
    _id,
    name,
    image,
    description,
    price,
    minimum_order_quantity,
    available_quantity,
  } = product;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="relative flex flex-col mt-6 bg-white text-gray-700 shadow-md rounded-xl w-96">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden shadow-lg rounded-xl">
          <img
            className="w-full h-full object-cover rounded-t-xl"
            src={image || "/placeholder.png"}
            alt={name || "Product"}
          />
        </div>

        <div className="p-6">
          <h5 className="mb-2 text-xl font-semibold text-gray-900">
            {name || "Unnamed Product"}
          </h5>
          <p className="mb-4 text-sm text-gray-600">
            {description || "No description available."}
          </p>
          <h6 className="mb-2 text-xl font-semibold text-gray-900">
            Price Per Unit: ${price != null ? price : "N/A"}
          </h6>
          <h6 className="mb-2 text-xl font-semibold text-gray-900">
            Minimum Order Quantity: {minimum_order_quantity || 1}
          </h6>
          <p className="text-sm text-gray-600">
            {available_quantity != null ? available_quantity : 0} Items Left
          </p>
        </div>

        <div className="p-6 pt-0 flex justify-between">
          <button
            onClick={openModal}
            className="py-3 px-6 text-xs font-bold uppercase rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
            aria-label="View product details"
          >
            Details
          </button>
          <Link to={`/make_order/${_id || ""}`}>
            <button
              className="py-3 px-6 text-xs font-bold uppercase rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
              type="button"
              aria-label="Order this product"
              disabled={!_id}
            >
              Order Now
            </button>
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-semibold mb-4">{name}</h2>
          <img
            className="w-full h-64 object-cover rounded mb-4"
            src={image || "/placeholder.png"}
            alt={name || "Product"}
          />
          <p className="mb-2">
            <strong>Description:</strong> {description || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Price Per Unit:</strong> ${price != null ? price : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Minimum Order Quantity:</strong>{" "}
            {minimum_order_quantity || 1}
          </p>
          <p className="mb-2">
            <strong>Available Quantity:</strong>{" "}
            {available_quantity != null ? available_quantity : 0} Items Left
          </p>

          <div className="mt-4 flex justify-center">
            <Link to={`/make_order/${_id || ""}`}>
              <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                Order Now
              </button>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Product;
