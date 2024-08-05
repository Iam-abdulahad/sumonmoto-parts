
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
      className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-wrap justify-around"
    >
      <div className="summary-item flex flex-col items-center m-4">
        <FaUsers className="text-blue-500 text-6xl mb-2" />
        <h3 className="text-2xl font-semibold">
          {inView ? <CountUp end={100} duration={3} /> : "0"}+
        </h3>
        <p className="text-gray-600">Customers Served</p>
      </div>
      <div className="summary-item flex flex-col items-center m-4">
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
      <div className="summary-item flex flex-col items-center m-4">
        <FaStar className="text-yellow-500 text-6xl mb-2" />
        <h3 className="text-2xl font-semibold">
          {inView ? <CountUp end={33000} duration={3} /> : "0"}+
        </h3>
        <p className="text-gray-600">Reviews</p>
      </div>
      <div className="summary-item flex flex-col items-center m-4">
        <FaTools className="text-red-500 text-6xl mb-2" />
        <h3 className="text-2xl font-semibold">
          {inView ? <CountUp end={50} duration={3} /> : "0"}+
        </h3>
        <p className="text-gray-600">Tools Available</p>
      </div>
    </div>
  );
};

export default BusinessSummary;
