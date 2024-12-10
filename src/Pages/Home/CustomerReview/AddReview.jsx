import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { app } from "../../../Firebase/firebase.config";

const AddReview = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    review: "",
    photoURL: "",
  });

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sumonmoto-parts-server.onrender.com/reviews",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Thank you for your feedback.",
        });

        // Optionally reset form
        setFormData({
          name: formData.name,
          email: formData.email,
          rating: "",
          review: "",
          photoURL: formData.photoURL,
        });
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      // Handle errors
      let errorMessage = "Something went wrong. Please try again later.";

      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage =
          "No response from the server. Please check your connection.";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="flex items-center justify-center backdrop-blur-sm">
      <div className="max-w-lg w-full p-6 mx-4 my-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-sky-600 text-center">
          Add a Review
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <select
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="review"
            >
              Review
            </label>
            <textarea
              name="review"
              id="review"
              value={formData.review}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white title1 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
