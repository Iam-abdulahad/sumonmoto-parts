import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-screen bg-custom-background bg-cover bg-center bg-fixed">
        <Outlet></Outlet>
      </div>
      <div className="bg-footer-background bg-cover bg-center">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
