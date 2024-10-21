import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="scroll-smooth flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-custom-background bg-cover bg-center bg-fixed flex-grow">
        <Outlet />
      </div>
      <div className="bg-footer-background bg-cover bg-center mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
