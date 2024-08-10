const CompanyOverview = () => {
  return (
    <section className="">
      <div className="text-gray-800 py-20 backdrop-blur-lg">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-5xl font-extrabold mb-10 text-black">About Us</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Welcome to{" "}
            <span className="font-semibold text-yellow-300">
              Motor Parts Co.
            </span>{" "}
            – your trusted partner in high-quality motor parts manufacturing.
            With decades of experience in the industry, we pride ourselves on
            delivering exceptional products that meet the highest standards of
            quality and performance.
          </p>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our commitment to innovation and excellence has positioned us as a
            leader in the motor parts sector. We employ cutting-edge technology
            and a skilled workforce to ensure that every product leaving our
            facility is crafted to perfection.
          </p>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            At{" "}
            <span className="font-semibold text-yellow-300">
              Motor Parts Co.
            </span>
            , we understand the importance of reliability and durability in the
            automotive industry. That’s why our comprehensive range of motor
            parts is designed to meet the diverse needs of our clients, from
            small-scale workshops to large industrial enterprises.
          </p>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-6">
              <div className="bg-white hover:bg-blue-500 hover:text-white p-8 border rounded-lg transform hover:scale-105 duration-500 h-full">
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg">
                  To provide top-notch motor parts that enhance the performance
                  and longevity of vehicles, ensuring customer satisfaction and
                  trust.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6">
              <div className="bg-white hover:bg-blue-500 hover:text-white p-8 border rounded-lg transform hover:scale-105 duration-500 h-full">
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg">
                  To be the global leader in motor parts manufacturing,
                  recognized for our quality, innovation, and commitment to
                  excellence.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6">
              <div className="bg-white hover:bg-blue-500 hover:text-white p-8 border rounded-lg transform hover:scale-105 duration-500 h-full">
                <h3 className="text-3xl font-bold mb-4">Our Values</h3>
                <p className="text-lg">
                  Integrity, innovation, customer focus, and continuous
                  improvement drive everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
