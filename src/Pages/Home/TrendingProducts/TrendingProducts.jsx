import ProductCard from "../../../components/shared/ProductCard";

const TrendingProducts = () => {
  const products = [
    {
      _id: "1",
      name: "NGK Iridium Spark Plug",
      brand: "NGK",
      price: 850,
      oldPrice: 1050,
      discount: 20,
      stock: 45,
      rating: 4.8,
      reviewCount: 32,
      compatibility: ["Honda CB Shine", "Yamaha FZ"],
      image: "https://ngksparkplugs.com/wp-content/uploads/2018/11/Iridium-IX_700x700.jpg"
    },
    {
      _id: "2",
      name: "Motul 7100 4T 10W-40 Synthetic Engine Oil",
      brand: "Motul",
      price: 1250,
      discount: 0,
      stock: 120,
      rating: 4.9,
      reviewCount: 89,
      compatibility: ["Universal"],
      image: "https://m.media-amazon.com/images/I/71u+K0uC1aL._SL1500_.jpg"
    },
    {
      _id: "3",
      name: "Brembo Front Brake Pad",
      brand: "Brembo",
      price: 2400,
      oldPrice: 2800,
      discount: 14,
      stock: 12,
      rating: 4.7,
      reviewCount: 15,
      compatibility: ["Yamaha R15 V3", "MT-15"],
      image: "https://www.brembo.com/en/PublishingImages/Car/Aftermarket/Brake-pads/Brembo_Pastiglie_Xtra.png"
    },
    {
      _id: "4",
      name: "K&N High Flow Air Filter",
      brand: "K&N",
      price: 4500,
      discount: 0,
      stock: 5,
      rating: 4.6,
      reviewCount: 22,
      compatibility: ["Suzuki Gixxer SF", "Honda Hornet"],
      image: "https://m.media-amazon.com/images/I/81xU9E+92vL._SL1500_.jpg"
    }
  ];

  return (
    <div className="py-16 bg-motor-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-extrabold text-motor-black font-heading uppercase italic tracking-wide">
            Trending Products
          </h2>
          <button className="text-motor-red font-bold hover:text-red-700 transition-colors uppercase text-sm">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
