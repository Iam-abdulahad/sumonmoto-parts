// ProductDetails.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOrderNow = () => {
    onClose();
    navigate("/orders"); 
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        
        {children}

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleOrderNow}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
