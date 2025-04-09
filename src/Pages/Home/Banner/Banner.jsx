import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/Images/banner.jpg";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="w-full h-[38rem] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-md"
          >
            Sumon Engineered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 animate-pulse">
              Motor Parts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-6 text-lg md:text-xl text-gray-200"
          >
            Reliable. Durable. High Performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <Link to="/products">
              <button className="px-8 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 rounded-full font-semibold shadow-lg hover:shadow-indigo-500/50">
                Explore Our Products
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
