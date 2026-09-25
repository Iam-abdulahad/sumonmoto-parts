import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/shared/ProductCard";

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://sumonmoto-parts-server.onrender.com/products")
      .then((response) => {
        // Map the existing data to include fields expected by ProductCard
        const enhancedData = response.data.map(item => ({
          ...item,
          rating: item.rating || (4.0 + Math.random()).toFixed(1),
          reviewCount: item.reviewCount || Math.floor(Math.random() * 50) + 1,
          discount: item.discount || 0,
          brand: item.brand || "GENERIC",
          compatibility: item.compatibility || ["Universal"],
          stock: item.available_quantity !== undefined ? item.available_quantity : 10
        }));
        setData(enhancedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-motor-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-primary-800 font-bold uppercase tracking-widest">Loading Products...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-motor-black mb-4">Failed to load products</h2>
        <p className="text-neutral-500 mb-6">{error.message || error}</p>
      </div>
    );

  return (
    <div className="bg-motor-surface min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-motor-black font-heading uppercase italic tracking-wide">
            Shop Motor Parts
          </h1>
          <p className="text-lg text-neutral-500 mt-4 max-w-2xl mx-auto">
            Find the right parts for your ride from our extensive catalog of premium components.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-24">
              
              {/* Search */}
              <div className="mb-8">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:border-motor-red focus:ring-1 focus:ring-motor-red outline-none transition-all"
                />
              </div>

              {/* Category */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-motor-black uppercase tracking-wider text-sm">Category</h3>
                </div>
                <div className="space-y-3 text-sm text-neutral-600">
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Engine
                  </label>
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Brake
                  </label>
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Electrical
                  </label>
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Suspension
                  </label>
                </div>
              </div>

              {/* Brand */}
              <div className="mb-8">
                <h3 className="font-bold text-motor-black uppercase tracking-wider text-sm mb-4">Brand</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Honda
                  </label>
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Yamaha
                  </label>
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Suzuki
                  </label>
                </div>
              </div>

              {/* Compatibility */}
              <div>
                <h3 className="font-bold text-motor-black uppercase tracking-wider text-sm mb-4">Compatibility</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Honda CB Shine
                  </label>
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Yamaha FZ
                  </label>
                  <label className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" />
                    Suzuki Gixxer
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
              <span className="text-sm text-neutral-500 font-medium">
                <span className="font-bold text-motor-black">{data?.length || 0}</span> Products
              </span>
              <div className="flex items-center text-sm">
                <span className="text-neutral-500 mr-3">Sort:</span>
                <select className="border-none bg-transparent font-bold text-motor-black focus:ring-0 cursor-pointer">
                  <option>Popular</option>
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-neutral-200 p-16 text-center shadow-sm">
                <div className="text-neutral-400 mb-4 flex justify-center">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-motor-black mb-2">No Parts Found</h3>
                <p className="text-neutral-500">We couldn't find any parts matching your filters.</p>
                <button className="mt-6 text-motor-red font-bold hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
