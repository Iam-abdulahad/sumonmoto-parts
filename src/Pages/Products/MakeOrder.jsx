import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { app } from "../../Firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { Star, Minus, Plus, Heart, ShoppingCart } from "lucide-react";

const auth = getAuth(app);

const MakeOrder = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  
  // Checkout states
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Guest User",
          email: currentUser.email || "No Email",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!productId) {
      Swal.fire({
        icon: "error",
        title: "Invalid Product ID",
        text: "The product ID is missing or invalid.",
      });
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `https://sumonmoto-parts-server.onrender.com/make_order/${productId}`
        );
        // Map some missing fields for the redesign demo if they don't exist
        const data = {
          ...response.data,
          rating: response.data.rating || 4.8,
          reviewCount: response.data.reviewCount || 32,
          compatibility: response.data.compatibility || ["Honda CB Shine", "Yamaha FZ"],
          description: response.data.description || "High-performance part built for durability and reliability. Guaranteed to exceed OEM specifications.",
        };
        setProductData(data);
        setOrderQuantity(data.minimum_order_quantity || 1);
        setLoading(false);

        // Add to recently viewed in localStorage
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const exists = recentlyViewed.find(item => item._id === data._id);
        if (!exists) {
          const newRecentlyViewed = [data, ...recentlyViewed].slice(0, 4); // Keep last 4
          localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
        }

      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleOrder = async () => {
    if (orderQuantity < (productData.minimum_order_quantity || 1)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Order Quantity",
        text: `Minimum order quantity is ${productData.minimum_order_quantity || 1}`,
      });
      return;
    }

    const totalPrice = productData.price * orderQuantity;
    const generateOrderId = () => {
      const timestamp = Date.now(); 
      const randomPart = Math.floor(1000 + Math.random() * 9000); 
      return Number(`${timestamp}${randomPart}`);
    };
    const orderId = generateOrderId();

    const orderData = {
      orderId,
      productName: productData.name,
      price: productData.price,
      totalPrice: totalPrice,
      quantity: orderQuantity,
      customerName: user?.name || "Anonymous",
      customerEmail: user?.email || "No Email Provided",
      shippingInfo,
      contactInfo,
      orderTime: new Date().toISOString(),
      status: "Pending",
    };

    try {
      await axios.post("https://sumonmoto-parts-server.onrender.com/orders", orderData);
      await axios.patch(`https://sumonmoto-parts-server.onrender.com/products/${productId}`, {
        quantity: orderQuantity,
        action: "deduct",
      });

      Swal.fire({
        icon: "success",
        title: "Order Confirmed",
        text: "Your order has been placed successfully!",
        confirmButtonColor: "#E1251B"
      }).then(() => {
        navigate("/orders");
      });
    } catch (error) {
      console.error("Error placing the order:", error);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.response?.data?.message || "Failed to place the order. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-motor-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-primary-800 font-bold uppercase tracking-widest">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-motor-black mb-4">Product Not Found</h2>
        <p className="text-neutral-500 mb-6">{error}</p>
        <Link to="/" className="text-motor-red font-bold hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-motor-surface min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-neutral-500 mb-8 font-medium">
          <Link to="/" className="hover:text-motor-red transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-motor-red transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-motor-black truncate">{productData.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Product Image */}
            <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-neutral-50 border-b lg:border-b-0 lg:border-r border-neutral-200 relative">
              <button className="absolute top-6 right-6 text-neutral-400 hover:text-motor-red transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow-md">
                <Heart className="w-6 h-6" />
              </button>
              <img
                src={productData.image}
                alt={productData.name}
                className="max-w-full max-h-[500px] object-contain drop-shadow-xl"
              />
            </div>

            {/* Right: Product Info & Actions */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-motor-black font-heading mb-4">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-motor-black mr-2">{productData.rating}</span>
                <span className="text-sm text-neutral-500 underline cursor-pointer">{productData.reviewCount} Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-end mb-6">
                <span className="text-4xl font-extrabold text-motor-red">৳{productData.price?.toLocaleString()}</span>
                {productData.oldPrice && (
                  <span className="text-xl text-neutral-400 line-through ml-4 mb-1">৳{productData.oldPrice?.toLocaleString()}</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center mb-6">
                {productData.available_quantity > 0 ? (
                  <span className="flex items-center text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                    In Stock ({productData.available_quantity} available)
                  </span>
                ) : (
                  <span className="flex items-center text-motor-red font-bold bg-red-50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-motor-red mr-2"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Fits */}
              <div className="bg-neutral-50 rounded-xl p-4 mb-8 border border-neutral-100">
                <h4 className="text-sm font-bold text-primary-800 mb-2 uppercase tracking-wide">Fits:</h4>
                <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                  {productData.compatibility?.map((bike, idx) => (
                    <li key={idx}>{bike}</li>
                  ))}
                </ul>
              </div>

              {!showCheckout ? (
                <>
                  {/* Quantity & Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center border-2 border-neutral-200 rounded-lg h-14">
                      <button 
                        onClick={() => setOrderQuantity(Math.max(productData.minimum_order_quantity || 1, orderQuantity - 1))}
                        className="px-4 text-neutral-500 hover:text-motor-black transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{orderQuantity}</span>
                      <button 
                        onClick={() => setOrderQuantity(Math.min(productData.available_quantity, orderQuantity + 1))}
                        className="px-4 text-neutral-500 hover:text-motor-black transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button 
                      className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-motor-black font-bold h-14 rounded-lg flex items-center justify-center transition-colors uppercase tracking-wide border border-neutral-200"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                    </button>
                    
                    <button 
                      onClick={() => {
                        if(!user) {
                          Swal.fire({icon:"warning", title:"Login Required", text:"Please log in to buy items."})
                          return;
                        }
                        setShowCheckout(true)
                      }}
                      disabled={productData.available_quantity === 0}
                      className="flex-1 bg-motor-red hover:bg-red-700 text-white font-bold h-14 rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-motor-red/20 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Buy Now
                    </button>
                  </div>
                </>
              ) : (
                /* Checkout Form */
                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-motor-black">Quick Checkout</h3>
                    <button onClick={() => setShowCheckout(false)} className="text-sm text-neutral-500 hover:text-motor-red font-medium">Cancel</button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-primary-800 mb-1">Shipping Address</label>
                      <textarea
                        className="w-full border-2 border-neutral-200 rounded-lg p-3 focus:border-motor-red focus:ring-0 outline-none transition-colors resize-none"
                        rows="2"
                        placeholder="House 12, Road 5, Block A..."
                        value={shippingInfo}
                        onChange={(e) => setShippingInfo(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary-800 mb-1">Contact Phone</label>
                      <input
                        type="text"
                        className="w-full border-2 border-neutral-200 rounded-lg p-3 focus:border-motor-red focus:ring-0 outline-none transition-colors"
                        placeholder="+880 1..."
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center py-4 border-t border-b border-neutral-200 my-4">
                      <span className="font-bold text-motor-black">Total ({orderQuantity} items):</span>
                      <span className="text-xl font-extrabold text-motor-red">৳{(productData.price * orderQuantity).toLocaleString()}</span>
                    </div>

                    <button
                      onClick={handleOrder}
                      className="w-full bg-motor-black hover:bg-neutral-800 text-white font-bold h-14 rounded-lg flex items-center justify-center transition-colors shadow-lg uppercase tracking-wide"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              )}

              {/* Tabs Section */}
              <div className="mt-8 border-t border-neutral-200 pt-8">
                <div className="flex space-x-8 border-b border-neutral-200 mb-6">
                  <button className="pb-4 border-b-2 border-motor-red text-motor-red font-bold uppercase tracking-wide text-sm">Description</button>
                  <button className="pb-4 border-b-2 border-transparent text-neutral-500 hover:text-motor-black font-bold uppercase tracking-wide text-sm transition-colors">Specifications</button>
                </div>
                <div className="prose prose-sm max-w-none text-neutral-600">
                  <p>{productData.description}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeOrder;
