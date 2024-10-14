import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="bg-custom-background bg-cover bg-center bg-fixed flex-grow">
        <Outlet></Outlet>
      </div>
      <div className="bg-footer-background bg-cover bg-center mt-auto">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
