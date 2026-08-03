import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/Images/banner.jpg";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";

const Banner = () => {
  return (
    <div
      className="w-full h-[40rem] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary-900/80"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight"
          >
            Premium Motorcycle Parts.
            <br />
            <span className="text-accent-500">
              OEM Quality. Rider Approved.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-neutral-300 font-sans"
          >
            Upgrade your ride with track-tested components built for ultimate performance and durability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10"
          >
            <Link to="/products">
              <Button size="lg" className="shadow-lg shadow-accent-500/20">
                Explore Our Parts
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
