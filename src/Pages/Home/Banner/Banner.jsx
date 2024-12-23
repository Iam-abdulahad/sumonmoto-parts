import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/Images/banner.jpg";

const Banner = () => {


  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/40 backdrop-blur-lg">
        <div className="text-center">
          <h1 className="title1 text-3xl font-semibold text-white lg:text-4xl">
            Sumon Engineered <span className="text-blue-400">Motor Parts</span>
          </h1>
          <p className="mt-4 text-lg text-white lg:text-xl">
            Reliable. Durable. High Performance.
          </p>
          <Link to="/products">
            <button
              className="px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Explore Our Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
