import Banner from "../Banner/Banner";
import ShopByMotorcycle from "../ShopByMotorcycle/ShopByMotorcycle";
import PopularCategories from "../PopularCategories/PopularCategories";
import TrendingProducts from "../TrendingProducts/TrendingProducts";

const Home = () => {
    return (
        <div>
            <Banner />
            <ShopByMotorcycle />
            <PopularCategories />
            <TrendingProducts />
        </div>
    );
};

export default Home;