import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import app from "../../../Firebase/firebase.config";

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
      const response = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

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
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
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
