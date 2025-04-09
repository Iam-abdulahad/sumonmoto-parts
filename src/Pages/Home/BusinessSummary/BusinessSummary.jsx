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
      className="relative bg-fixed bg-center bg-cover py-20"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/colored-political-world-map_23-2148319222.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-400 to-blue-500 drop-shadow-md">
            Million Businesses Trust Us
          </h2>
          <p className="text-white mt-4 text-lg">
            We always strive to understand our user's expectations
          </p>
          <div className="mt-4 flex justify-center gap-1">
            <span className="w-40 h-1 bg-teal-400 rounded-full" />
            <span className="w-3 h-1 bg-teal-400 rounded-full" />
            <span className="w-1 h-1 bg-teal-400 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <FaUsers className="text-teal-400 text-6xl mb-4" />,
              label: "Customers Served",
              count: 100,
              suffix: "+",
            },
            {
              icon: <FaDollarSign className="text-green-400 text-6xl mb-4" />,
              label: "Annual Revenue",
              count: 120,
              prefix: "$",
              suffix: "M+",
            },
            {
              icon: <FaStar className="text-yellow-400 text-6xl mb-4" />,
              label: "Reviews",
              count: 33000,
              suffix: "+",
            },
            {
              icon: <FaTools className="text-pink-400 text-6xl mb-4" />,
              label: "Tools Available",
              count: 50,
              suffix: "+",
            },
          ].map(({ icon, label, count, prefix = "", suffix = "" }, i) => (
            <div
              key={i}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-8 text-center shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
            >
              {icon}
              <h3 className="text-3xl font-bold text-white">
                {inView ? (
                  <CountUp
                    end={count}
                    duration={3}
                    prefix={prefix}
                    suffix={suffix}
                  />
                ) : (
                  `${prefix}0${suffix}`
                )}
              </h3>
              <p className="text-gray-300 mt-2">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-md p-10 rounded-xl flex flex-col md:flex-row justify-between items-center text-white">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2 text-teal-300">
              Have any questions or product requests?
            </h3>
            <p className="text-md text-gray-300">
              Don't hesitate to reach out!
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-lg transition-all duration-300">
              Request a Quote
            </button>
            <button className="px-6 py-3 rounded-lg bg-black hover:bg-gray-800 text-white font-bold border border-white/30 shadow-md transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
