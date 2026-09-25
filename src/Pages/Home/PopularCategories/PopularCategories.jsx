import { Link } from "react-router-dom";
import { Settings, Disc, Zap, Shield } from "lucide-react"; // using icons as placeholders for categories

const PopularCategories = () => {
  const categories = [
    { name: "Engine Parts", icon: Settings, slug: "engine", count: "1,240 items" },
    { name: "Brake System", icon: Disc, slug: "brake", count: "850 items" },
    { name: "Electrical", icon: Zap, slug: "electrical", count: "420 items" },
    { name: "Suspension", icon: Shield, slug: "suspension", count: "360 items" },
  ];

  return (
    <div className="py-16 bg-motor-surface border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-motor-black font-heading mb-8 uppercase italic tracking-wide">
          Popular Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link 
                key={index} 
                to={`/products?category=${category.slug}`}
                className="group flex flex-col items-center p-8 bg-white border border-neutral-200 rounded-xl hover:border-motor-red hover:shadow-xl shadow-sm transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-primary-800 group-hover:bg-motor-red group-hover:text-white transition-colors duration-300 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-motor-black group-hover:text-motor-red transition-colors">
                  {category.name}
                </h3>
                <p className="text-neutral-500 mt-2 font-medium">{category.count}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
