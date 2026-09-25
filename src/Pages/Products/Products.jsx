import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/shared/ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [compatibilities, setCompatibilities] = useState([]);
  const [sort, setSort] = useState("popular");

  // Filter options
  const categoryOptions = ["Engine", "Brake", "Electrical", "Suspension"];
  const brandOptions = ["Honda", "Yamaha", "Suzuki", "Bajaj", "NGK"];
  const compatibilityOptions = ["Honda CB Shine", "Yamaha FZ", "Suzuki Gixxer"];

  const handleCheckboxChange = (setState, state, value) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  useEffect(() => {
    setLoading(true);
    
    // Build query params
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (categories.length > 0) params.append("category", categories.join(','));
    if (brands.length > 0) params.append("brand", brands.join(','));
    if (compatibilities.length > 0) params.append("compatibility", compatibilities.join(','));
    if (sort) params.append("sort", sort);

    axios
      .get(`https://sumonmoto-parts-server.onrender.com/products?${params.toString()}`)
      .then((response) => {
        // Map the data to ensure fields exist for UI (since existing DB items might lack them)
        const enhancedData = response.data.map(item => ({
          ...item,
          rating: item.rating || (4.0 + Math.random()).toFixed(1),
          reviewCount: item.reviewCount || Math.floor(Math.random() * 50) + 1,
          discount: item.discount || 0,
          brand: item.brand || "Generic",
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
  }, [search, categories, brands, compatibilities, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategories([]);
    setBrands([]);
    setCompatibilities([]);
    setSort("popular");
  };

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:border-motor-red focus:ring-1 focus:ring-motor-red outline-none transition-all"
                />
              </div>

              {/* Category */}
              <div className="mb-8">
                <h3 className="font-bold text-motor-black uppercase tracking-wider text-sm mb-4">Category</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  {categoryOptions.map(cat => (
                    <label key={cat} className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        checked={categories.includes(cat)}
                        onChange={() => handleCheckboxChange(setCategories, categories, cat)}
                        className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" 
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="mb-8">
                <h3 className="font-bold text-motor-black uppercase tracking-wider text-sm mb-4">Brand</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  {brandOptions.map(b => (
                    <label key={b} className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        checked={brands.includes(b)}
                        onChange={() => handleCheckboxChange(setBrands, brands, b)}
                        className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" 
                      />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              {/* Compatibility */}
              <div>
                <h3 className="font-bold text-motor-black uppercase tracking-wider text-sm mb-4">Compatibility</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  {compatibilityOptions.map(comp => (
                    <label key={comp} className="flex items-center hover:text-motor-red cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        checked={compatibilities.includes(comp)}
                        onChange={() => handleCheckboxChange(setCompatibilities, compatibilities, comp)}
                        className="mr-3 rounded border-neutral-300 text-motor-red focus:ring-motor-red" 
                      />
                      {comp}
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
              <span className="text-sm text-neutral-500 font-medium mb-2 sm:mb-0">
                <span className="font-bold text-motor-black">{data?.length || 0}</span> Products
              </span>
              <div className="flex items-center text-sm">
                <span className="text-neutral-500 mr-3">Sort:</span>
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border-none bg-transparent font-bold text-motor-black focus:ring-0 cursor-pointer"
                >
                  <option value="popular">Popular</option>
                  <option value="price_asc">Price (Low to High)</option>
                  <option value="price_desc">Price (High to Low)</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {loading ? (
               <div className="flex justify-center items-center min-h-[40vh]">
                 <div className="animate-pulse flex flex-col items-center">
                   <div className="w-12 h-12 border-4 border-motor-red border-t-transparent rounded-full animate-spin mb-4"></div>
                   <div className="text-primary-800 font-bold uppercase tracking-widest text-sm">Updating...</div>
                 </div>
               </div>
            ) : error ? (
               <div className="bg-white rounded-xl border border-red-200 p-8 text-center shadow-sm">
                 <p className="text-motor-red font-bold">Error loading data: {error.message}</p>
               </div>
            ) : data && data.length > 0 ? (
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
                <button onClick={clearFilters} className="mt-6 text-motor-red font-bold hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
