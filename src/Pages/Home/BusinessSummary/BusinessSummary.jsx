import { FaUsers, FaDollarSign, FaStar, FaTools } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const BusinessSummary = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="rounded-lg shadow-lg bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/colored-political-world-map_23-2148319222.jpg?t=st=1733581868~exp=1733585468~hmac=1adb40a71288d4a9d29acdd86e681d614dffe1006f7e8ba7b2dcdc5d449e35ce&w=1380",
      }}
    >
      <div className="p-8">
        <div className="grid justify-items-center">
          <div className="text-center title1">
            <span className="py-8 font-poppins font-semibold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Million Bussiness Trust Us
            </span>
            <p className="py-4">Try To Understand Users Expectation</p>
          </div>
          <div className=" ">
            <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
          </div>
        </div>

        <div className="py-8 flex flex-wrap justify-around ">
          <div className="summary-item flex flex-col items-center m-4 mix-blend-multiply bg-gray-300 rounded-lg p-8">
            <FaUsers className="text-blue-500 text-6xl mb-2" />
            <h3 className="text-2xl font-semibold">
              {inView ? <CountUp end={100} duration={3} /> : "0"}+
            </h3>
            <p className="text-gray-600">Customers Served</p>
          </div>
          <div className="summary-item flex flex-col items-center m-4 mix-blend-multiply bg-gray-300 rounded-lg p-8">
            <FaDollarSign className="text-green-500 text-6xl mb-2" />
            <h3 className="text-2xl font-semibold">
              {inView ? (
                <CountUp end={120} duration={3} prefix="$" suffix="M+" />
              ) : (
                "$0M+"
              )}
            </h3>
            <p className="text-gray-600">Annual Revenue</p>
          </div>
          <div className="summary-item flex flex-col items-center m-4 mix-blend-multiply bg-gray-300 rounded-lg p-8">
            <FaStar className="text-yellow-500 text-6xl mb-2" />
            <h3 className="text-2xl font-semibold">
              {inView ? <CountUp end={33000} duration={3} /> : "0"}+
            </h3>
            <p className="text-gray-600">Reviews</p>
          </div>
          <div className="summary-item flex flex-col items-center m-4 mix-blend-multiply bg-gray-300 rounded-lg p-8">
            <FaTools className="text-red-500 text-6xl mb-2" />
            <h3 className="text-2xl font-semibold">
              {inView ? <CountUp end={50} duration={3} /> : "0"}+
            </h3>
            <p className="text-gray-600">Tools Available</p>
          </div>
        </div>

        <div className="container mx-auto bg-white p-12 rounded-lg shadow-2xl flex flex-col md:flex-row justify-between items-center  space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-lg text-blue-500 md:text-xl lg:text-2xl font-semibold">
              Have any questions about us or get a product request?
            </h3>
            <p className="text-sm md:text-base lg:text-lg">
              Do not hesitate to contact us
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-1/2 space-y-4 md:space-y-0 md:space-x-4">
            <button
              className="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-400 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-blue-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              Request For Quote
            </button>

            <button
              className="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
