import { motion } from "framer-motion";
import SectionHeader from "../../../components/ui/SectionHeader";
import { ShieldCheck, Target, Zap } from "lucide-react";

const CompanyOverview = () => {
  return (
    <section className="py-16 md:py-24 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader 
          title="Built for Riders, by Riders" 
          subtitle="SumonMoto Parts Co. is your trusted partner for high-quality motorcycle parts. We focus on reliability, durability, and performance to keep you safely on the road or the track."
          center={true}
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Motorcycle workshop"
              className="w-full rounded-xl shadow-lg object-cover h-[400px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3 font-heading">
                Industry-Leading Quality
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Our commitment to innovation and excellence has positioned us as a
                leader in the motor parts sector. We strictly supply OEM and top-tier aftermarket components.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3 font-heading">
                Tested for Durability
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                At <span className="font-semibold text-accent-600">SumonMoto</span>, we understand the importance of reliability. Every part in our catalog is guaranteed to meet stringent safety and performance standards.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              desc: "To provide top-notch motor parts that enhance vehicle performance and longevity.",
              icon: Target,
            },
            {
              title: "Our Vision",
              desc: "To be the global leader in motor parts retailing through innovation and excellence.",
              icon: Zap,
            },
            {
              title: "Our Values",
              desc: "Integrity, innovation, customer focus, and continuous improvement guide everything we do.",
              icon: ShieldCheck,
            },
          ].map(({ title, desc, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-900 text-accent-500 rounded-lg flex items-center justify-center mb-6">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900 font-heading">{title}</h3>
              <p className="text-neutral-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
