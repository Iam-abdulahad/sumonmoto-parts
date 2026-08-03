import { Users, DollarSign, Star, Wrench } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../../../components/ui/SectionHeader";
import Button from "../../../components/ui/Button";

const BusinessSummary = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="relative bg-primary-900 py-20 border-t border-primary-800"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle background pattern or texture could go here. For now, solid primary-900 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeader
            title={<span className="text-white">Trusted by Riders & Mechanics</span>}
            subtitle="We deliver quality parts at scale, ensuring every rider has what they need to hit the road."
            center={true}
            className="text-neutral-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <Users className="text-accent-500 w-10 h-10 mb-4" />,
              label: "Customers Served",
              count: 100,
              suffix: "k+",
            },
            {
              icon: <DollarSign className="text-accent-500 w-10 h-10 mb-4" />,
              label: "Annual Revenue",
              count: 120,
              prefix: "$",
              suffix: "M+",
            },
            {
              icon: <Star className="text-accent-500 w-10 h-10 mb-4" />,
              label: "Five-Star Reviews",
              count: 33,
              suffix: "k+",
            },
            {
              icon: <Wrench className="text-accent-500 w-10 h-10 mb-4" />,
              label: "Parts Available",
              count: 50,
              suffix: "k+",
            },
          ].map(({ icon, label, count, prefix = "", suffix = "" }, i) => (
            <div
              key={i}
              className="bg-primary-800 border border-primary-700 rounded-xl p-8 text-center shadow-md hover:border-accent-500 transition-colors duration-300 flex flex-col items-center"
            >
              {icon}
              <h3 className="text-4xl font-bold text-white font-heading mt-2">
                {inView ? (
                  <CountUp
                    end={count}
                    duration={2.5}
                    prefix={prefix}
                    suffix={suffix}
                  />
                ) : (
                  `${prefix}0${suffix}`
                )}
              </h3>
              <p className="text-neutral-400 mt-2 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary-800 border border-primary-700 p-10 rounded-xl flex flex-col md:flex-row justify-between items-center text-white">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2 text-white font-heading">
              Looking for a specific part?
            </h3>
            <p className="text-neutral-400">
              Our experts are ready to help you find exactly what you need.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button variant="secondary" size="lg" className="bg-transparent border-neutral-600 text-neutral-300 hover:text-neutral-900 hover:bg-neutral-100">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
