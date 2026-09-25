import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const RecentlyViewed = ({ currentProductId }) => {
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    // Filter out the current product from recently viewed
    const filteredItems = items.filter(item => item._id !== currentProductId);
    setRecentItems(filteredItems);
  }, [currentProductId]);

  if (recentItems.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-neutral-200">
      <h3 className="text-2xl font-extrabold text-motor-black font-heading mb-6 uppercase italic tracking-wide">
        Recently Viewed
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentItems.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
