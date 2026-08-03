import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Star, BadgeCheck } from "lucide-react";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const reviewsRef = useRef(null);

  // Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          "https://sumonmoto-parts-server.onrender.com/reviews"
        );
        setReviews(data);
      } catch (err) {
        setReviews([
          {
            name: "John Doe",
            review:
              "Excellent OEM quality. Delivery was fast and everything arrived safely packed. Highly recommended for anyone looking for genuine motorcycle parts.",
            rating: 5,
            position: "Professional Racer",
            photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Sarah Smith",
            review:
              "Customer support was amazing. They helped me choose the correct brake pads and the quality exceeded my expectations.",
            rating: 5,
            position: "Daily Rider",
            photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            name: "Mike Johnson",
            review:
              "Genuine products, competitive pricing and quick delivery. I'll definitely purchase again.",
            rating: 4,
            position: "Motorcycle Mechanic",
            photoURL: "https://randomuser.me/api/portraits/men/46.jpg",
          },
        ]);
      }
    };

    fetchReviews();
  }, []);

  // Auto Scroll
  useEffect(() => {
    const container = reviewsRef.current;

    if (!container) return;

    const interval = setInterval(() => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: 380,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews]);

  const scrollReviews = (direction) => {
    if (!reviewsRef.current) return;

    reviewsRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating
          ? "fill-yellow-400 text-yellow-400"
          : "text-slate-600"
          }`}
      />
    ));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-24">

      {/* Background Blur */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-red-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500/20 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-5 py-2 text-yellow-400 font-semibold">
            ⭐ Trusted by Thousands of Riders
          </div>

          <h2 className="mt-6 text-5xl font-black text-white">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Thousands of riders across Bangladesh trust SumonMoto Parts for
            genuine products, fast delivery and reliable customer support.
          </p>
        </div>

        {/* Controls */}

        <div className="mt-12 flex justify-end gap-4">

          <button
            onClick={() => scrollReviews("left")}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:bg-red-500"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scrollReviews("right")}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:bg-red-500"
          >
            <ChevronRight />
          </button>

        </div>

        {/* Reviews */}

        <div
          ref={reviewsRef}
          className="mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth scrollbar-hide pb-6"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="
    group
    relative
    w-[340px]
    h-[380px]
    flex-shrink-0
    snap-center
    rounded-3xl
    overflow-hidden
    bg-white/10
    backdrop-blur-xl
    border border-white/10
    p-6
    transition-all
    duration-500
    hover:-translate-y-3
    hover:border-red-500/40
    hover:shadow-[0_20px_60px_rgba(239,68,68,.25)]
  "
            >
              {/* Quote */}
              <span className="absolute top-2 left-5 text-7xl text-red-500/10 font-black">
                "
              </span>

              {/* Avatar */}
              <div className="flex justify-center">
                <img
                  src={review.photoURL}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white ring-4 ring-red-500/20 shadow-xl"
                />
              </div>

              {/* Name */}
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-white">
                  {review.name}
                </h3>

                <p className="text-sm text-red-400">
                  {review.position}
                </p>

                <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-xs">
                  <BadgeCheck className="w-4 h-4" />
                  Verified Buyer
                </span>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mt-4">
                {renderStars(review.rating)}
              </div>

              {/* Review */}
              <p className="
      mt-4
      text-sm
      leading-7
      text-slate-300
      text-center
      italic
      line-clamp-5
  ">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReview;