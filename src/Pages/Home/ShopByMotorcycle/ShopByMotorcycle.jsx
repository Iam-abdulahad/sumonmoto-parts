import { Link } from "react-router-dom";

const ShopByMotorcycle = () => {
  const brands = [
    { name: "Honda", image: "https://www.honda.com.bd/wp-content/uploads/2019/09/x-blade.png", slug: "honda" },
    { name: "Yamaha", image: "https://www.yamaha-motor-india.com/theme/v3/image/fz-s-fi-v4/color/metallic-grey.png", slug: "yamaha" },
    { name: "Suzuki", image: "https://suzukibangladesh.com/uploads/products/images/Gixxer_SF_Fi_ABS_-_Glass_Sparkle_Black.png", slug: "suzuki" },
    { name: "Bajaj", image: "https://www.bajajauto.com/media/pulsar/ns160/color/red/1.png", slug: "bajaj" },
  ];

  return (
    <div className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-motor-black font-heading mb-8 uppercase italic tracking-wide">
          Shop by Motorcycle
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <Link 
              key={index} 
              to={`/products?brand=${brand.slug}`}
              className="group block border border-neutral-200 rounded-xl p-6 text-center hover:border-motor-red hover:shadow-lg transition-all duration-300 bg-motor-surface"
            >
              <div className="h-32 mb-4 flex items-center justify-center">
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=" + brand.name; }}
                />
              </div>
              <h3 className="text-lg font-bold text-primary-800 group-hover:text-motor-red transition-colors">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByMotorcycle;
