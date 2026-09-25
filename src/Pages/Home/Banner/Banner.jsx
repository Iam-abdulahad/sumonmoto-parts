import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/Images/banner.jpg";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Banner = () => {
  return (
    <div
      className="w-full min-h-[42rem] bg-cover bg-center relative flex items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-motor-black/95 via-motor-black/80 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-left max-w-2xl w-full">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tight leading-tight"
          >
            FIND THE RIGHT PART <br />
            <span className="text-motor-red italic">FOR YOUR RIDE.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 relative max-w-xl"
          >
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-2xl shadow-motor-red/10 focus-within:ring-2 focus-within:ring-motor-red transition-all">
              <div className="pl-4 py-3 text-neutral-400">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Search parts, brands, models..." 
                className="w-full px-4 py-4 text-motor-black outline-none font-medium placeholder:text-neutral-400"
              />
              <button className="bg-motor-red hover:bg-red-700 text-white px-8 py-4 font-bold transition-colors">
                SEARCH
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/products">
              <button className="bg-motor-red hover:bg-red-700 text-white px-8 py-3.5 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-motor-red/20 uppercase tracking-wide">
                Shop Now
              </button>
            </Link>
            <Link to="/categories">
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-motor-black text-white px-8 py-3.5 rounded-lg font-bold text-lg transition-colors uppercase tracking-wide">
                Explore Categories
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
