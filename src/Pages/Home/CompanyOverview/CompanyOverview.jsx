import { motion } from "framer-motion";

const CompanyOverview = () => {
  return (
    <section className="relative text-white py-20">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
          About Us
        </h2>

        <motion.img
          src="https://img.freepik.com/free-vector/illustration-with-business-people-design_23-2148468477.jpg?t=st=1733583642~exp=1733587242~hmac=a41d48a0fd685bd935cfdc3eb9d881e305449ef314500a3be310174af00ebbe1&w=1380"
          alt="Company Overview"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto w-full max-w-3xl mb-10 rounded-2xl shadow-2xl"
        />

        <div className="backdrop-blur-md bg-gray-800/50 p-8 rounded-xl border border-white/20 max-w-4xl mx-auto mb-12">
          <p className="text-xl mb-6">
            Welcome to{" "}
            <span className="font-semibold text-yellow-400">
              SumonMoto Parts Co.
            </span>{" "}
            – your trusted partner in high-quality motor parts manufacturing.
          </p>
          <p className="text-xl mb-6">
            Our commitment to innovation and excellence has positioned us as a
            leader in the motor parts sector.
          </p>
          <p className="text-xl">
            At{" "}
            <span className="font-semibold text-yellow-400">
              SumonMoto Parts Co.
            </span>
            , we understand the importance of reliability and durability in the
            automotive industry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Our Mission",
              desc: "To provide top-notch motor parts that enhance vehicle performance and longevity.",
              color: "from-purple-500 to-pink-500",
            },
            {
              title: "Our Vision",
              desc: "To be the global leader in motor parts manufacturing through innovation and excellence.",
              color: "from-blue-500 to-teal-400",
            },
            {
              title: "Our Values",
              desc: "Integrity, innovation, customer focus, and continuous improvement guide us.",
              color: "from-yellow-400 to-orange-500",
            },
          ].map(({ title, desc, color }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`bg-gradient-to-br ${color} text-white p-8 rounded-xl shadow-lg`}
            >
              <h3 className="text-3xl font-bold mb-4">{title}</h3>
              <p className="text-lg">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
