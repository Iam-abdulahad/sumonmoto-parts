import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-motor-red transition-all duration-300">
      
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-4 left-4 bg-motor-red text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          -{product.discount}%
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 text-neutral-400 hover:text-motor-red z-10 transition-colors">
        <Heart className="w-5 h-5" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="relative h-48 bg-neutral-100 flex items-center justify-center p-4">
        <img 
          src={product.image || "https://via.placeholder.com/300x200"} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{product.brand}</span>
          <span className={`text-xs font-bold ${product.stock > 0 ? 'text-green-600' : 'text-motor-red'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="text-base font-bold text-motor-black hover:text-motor-red transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-xs font-medium text-neutral-500">
            {product.rating} ({product.reviewCount || 0})
          </span>
        </div>

        {/* Compatibility Snippet */}
        {product.compatibility && product.compatibility.length > 0 && (
          <div className="text-xs text-neutral-500 mb-4 flex items-center">
            <span className="font-semibold text-primary-800 mr-1">Fits:</span>
            <span className="truncate">{product.compatibility.join(", ")}</span>
          </div>
        )}

        {/* Price and Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-motor-black">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button 
            className="bg-neutral-100 hover:bg-motor-red text-motor-black hover:text-white p-2.5 rounded-lg transition-colors shadow-sm"
            aria-label="Add to cart"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
