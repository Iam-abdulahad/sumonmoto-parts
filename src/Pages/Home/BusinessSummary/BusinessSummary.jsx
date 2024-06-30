import { FaUsers, FaDollarSign, FaStar, FaTools } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const BusinessSummary = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Our Achievements</h2>
          <p className="text-gray-600">Here is a quick look at what we have accomplished.</p>
        </div>
        <div className="flex justify-around items-center flex-wrap">
          <div
            ref={ref1}
            className={`text-center p-6 bg-white rounded shadow-lg transition-transform transform ${
              inView1 ? 'animate__animated animate__fadeInUp' : ''
            }`}
          >
            <FaUsers className="text-5xl text-blue-500 mb-3" />
            <h3 className="text-2xl font-semibold">200+</h3>
            <p className="text-gray-600">Customers Served</p>
          </div>
          <div
            ref={ref2}
            className={`text-center p-6 bg-white rounded shadow-lg transition-transform transform ${
              inView2 ? 'animate__animated animate__fadeInUp' : ''
            }`}
          >
            <FaDollarSign className="text-5xl text-green-500 mb-3" />
            <h3 className="text-2xl font-semibold">120M+</h3>
            <p className="text-gray-600">Annual Revenue</p>
          </div>
          <div
            ref={ref3}
            className={`text-center p-6 bg-white rounded shadow-lg transition-transform transform ${
              inView3 ? 'animate__animated animate__fadeInUp' : ''
            }`}
          >
            <FaStar className="text-5xl text-yellow-500 mb-3" />
            <h3 className="text-2xl font-semibold">33K+</h3>
            <p className="text-gray-600">Reviews</p>
          </div>
          <div
            ref={ref4}
            className={`text-center p-6 bg-white rounded shadow-lg transition-transform transform ${
              inView4 ? 'animate__animated animate__fadeInUp' : ''
            }`}
          >
            <FaTools className="text-5xl text-red-500 mb-3" />
            <h3 className="text-2xl font-semibold">50+</h3>
            <p className="text-gray-600">Tools</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
