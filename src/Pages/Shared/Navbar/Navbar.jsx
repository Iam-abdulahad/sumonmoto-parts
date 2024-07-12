import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProviders";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        await logOut();
        Swal.fire({
            icon: 'success',
            title: 'Logged out',
            text: 'You have successfully logged out.',
        });
    };

    const isActive = (path) => location.pathname === path ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700";

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="title1 text-xl font-bold font-poppins">
                            SumonMoto <span className="text-sky-600">Parts</span>
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:space-x-8 sm:ml-auto">
                        <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/')}`}>Home</Link>
                        <Link to="/blog" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/blog')}`}>Blog</Link>
                        <Link to="/portfolio" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/portfolio')}`}>Portfolio</Link>

                        {user ? (
                            <>
                                <div className="relative inline-block">
                                    <button onClick={toggleDropdown} className={`inline-flex items-center px-1 pt-6 text-sm font-medium ${isActive('/dashboard')}`}>
                                        Dashboard
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute  mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</Link>
                                            <Link to="/add-review" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Add a Review</Link>
                                            <Link to="/my-orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</Link>
                                        </div>
                                    )}
                                </div>

                                <button onClick={handleLogout} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/logout')}`}>Logout <LuLogOut /></button>
                            </>
                        ) : (
                            <Link to="/login" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/login')}`}>Login</Link>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button onClick={toggleMenu} type="button" className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500" aria-controls="mobile-menu" aria-expanded={isOpen}>
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>


            <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}>Home</Link>
                    <Link to="/blog" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/blog')}`}>Blog</Link>
                    <Link to="/portfolio" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/portfolio')}`}>Portfolio</Link>
                    {user ? (
                        <>
                            <button onClick={toggleDropdown} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')}`}>Dashboard</button>
                            {isDropdownOpen && (
                                <div className="px-2 pt-2 pb-3 space-y-1">
                                    <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium">My Profile</Link>
                                    <Link to="/add-review" className="block px-3 py-2 rounded-md text-base font-medium">Add a Review</Link>
                                    <Link to="/my-orders" className="block px-3 py-2 rounded-md text-base font-medium">My Orders</Link>
                                </div>
                            )}
                            <button onClick={handleLogout} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/logout')}`}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/login')}`}>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
