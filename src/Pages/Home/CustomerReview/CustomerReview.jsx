import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./CustomerReview.css";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const reviewsRef = useRef(null);

  // Fetch data from the server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://sumonmoto-parts-server.onrender.com/reviews");
        setReviews(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load reviews. Please try again later.",
        });
      }
    };
    fetchReviews();
  }, []);

  // Auto-scroll reviews horizontally
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (reviewsRef.current) {
        reviewsRef.current.scrollBy({
          left: 1,
          behavior: "smooth",
        });
      }
    }, 20); // Adjust speed by changing interval duration

    return () => clearInterval(scrollInterval); // Cleanup on component unmount
  }, []);

  // Manual scroll handler
  const scrollReviews = (direction) => {
    if (reviewsRef.current) {
      const scrollAmount = 300; // Adjust scroll distance as needed
      reviewsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.382-2.455a1 1 0 00-1.176 0l-3.382 2.455c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.18 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <section className="backdrop-blur-lg dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              What our clients are saying
            </h1>
            <div className="flex mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
            </div>
          </div>

          <div className="flex justify-between mt-8 md:mt-0">
            <button
              title="left arrow"
              className="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
              onClick={() => scrollReviews("left")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              title="right arrow"
              className="p-2 text-gray-800 transition-colors duration-300 border rounded-full dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
              onClick={() => scrollReviews("right")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={reviewsRef}
          className="flex overflow-x-scroll gap-8 mt-8 xl:mt-12 h-auto scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-full max-w-md px-8 py-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 flex-shrink-0 mt-10"
            >
              <div className="flex justify-center -mt-10">
                <img
                  className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                  src={review.photoURL}
                  alt={review.name}
                />
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white text-center">
                {review.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 leading-relaxed">
                {review.review}
              </p>

              <div className="flex justify-center mt-4">
                {renderStars(review.rating)}
              </div>

              <div className="flex justify-end mt-4">
                <span className="text-lg font-medium text-blue-600 dark:text-blue-300">
                  {review.position}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
