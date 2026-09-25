import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../../Firebase/firebase.config";
import { AuthContext } from "../../../Providers/AuthProviders";
import { Search, ShoppingCart, User, Menu, X, LogOut, Package, Star, LayoutDashboard } from "lucide-react";

const auth = getAuth(app);
const defaultAvatar = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { userData } = useContext(AuthContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E1251B",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, log out",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut(auth);
        setIsOpen(false);
      }
    });
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-motor-red font-semibold"
      : "text-primary-800 hover:text-motor-red transition-colors";

  const isMobileActive = (path) =>
    location.pathname === path
      ? "text-motor-red font-semibold bg-neutral-100"
      : "text-primary-800 hover:text-motor-red hover:bg-neutral-100";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      {/* Top Bar - Dark Charcoal */}
      <div className="bg-motor-charcoal text-neutral-300 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Free Delivery over ৳5,000</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support</span>
            <span className="hover:text-white cursor-pointer transition-colors">Track Order</span>
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer transition-colors">Call: +880 1234 567890</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 transition-all border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl md:text-3xl font-extrabold font-heading text-motor-black tracking-tight uppercase italic">
                SumonMoto<span className="text-motor-red">.</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 items-center font-medium text-[15px]">
              <Link to="/categories" className={isActive("/categories")}>Categories</Link>
              <Link to="/brands" className={isActive("/brands")}>Brands</Link>
              <Link to="/deals" className={isActive("/deals")}>Deals</Link>
              <Link to="/contact" className={isActive("/contact")}>Contact</Link>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-primary-800 hover:text-motor-red transition-colors" aria-label="Search">
                <Search className="w-6 h-6" />
              </button>
              
              <Link to="/cart" className="text-primary-800 hover:text-motor-red transition-colors relative" aria-label="Cart">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-2 bg-motor-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none rounded-full ring-2 ring-transparent hover:ring-motor-red transition-all"
                  >
                    <img
                      src={user.photoURL || defaultAvatar}
                      alt="User"
                      className="w-9 h-9 rounded-full border border-neutral-200 object-cover"
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 z-50 overflow-hidden transform transition-all origin-top-right">
                      <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
                        <p className="text-sm font-semibold text-motor-black truncate">{user.displayName || 'User'}</p>
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        {userData?.role === "admin" && (
                          <Link to="/dashboard/manage_users" className="flex items-center px-4 py-2.5 text-sm text-primary-800 hover:bg-neutral-50 hover:text-motor-red">
                            <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
                          </Link>
                        )}
                        <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-primary-800 hover:bg-neutral-50 hover:text-motor-red">
                          <User className="w-4 h-4 mr-3" /> Profile
                        </Link>
                        <Link to="/orders" className="flex items-center px-4 py-2.5 text-sm text-primary-800 hover:bg-neutral-50 hover:text-motor-red">
                          <Package className="w-4 h-4 mr-3" /> Orders
                        </Link>
                        <Link to="/add_review" className="flex items-center px-4 py-2.5 text-sm text-primary-800 hover:bg-neutral-50 hover:text-motor-red">
                          <Star className="w-4 h-4 mr-3" /> Review
                        </Link>
                      </div>
                      
                      <div className="border-t border-neutral-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-motor-red hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3" /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-motor-red hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-5">
              <Link to="/cart" className="text-primary-800 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-2 bg-motor-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <button
                onClick={toggleMenu}
                className="text-neutral-500 hover:text-motor-black focus:outline-none p-1 rounded-md"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden transform transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-neutral-100 shadow-inner">
            <Link to="/categories" className={`block px-3 py-3 rounded-lg ${isMobileActive("/categories")}`} onClick={() => setIsOpen(false)}>Categories</Link>
            <Link to="/brands" className={`block px-3 py-3 rounded-lg ${isMobileActive("/brands")}`} onClick={() => setIsOpen(false)}>Brands</Link>
            <Link to="/deals" className={`block px-3 py-3 rounded-lg ${isMobileActive("/deals")}`} onClick={() => setIsOpen(false)}>Deals</Link>
            
            <div className="border-t border-neutral-200 my-2 pt-2">
              {user ? (
                <>
                  <div className="px-3 py-3 flex items-center space-x-3 mb-2 bg-neutral-50 rounded-lg">
                    <img src={user.photoURL || defaultAvatar} alt="" className="w-10 h-10 rounded-full border border-neutral-200 object-cover" />
                    <div>
                      <p className="text-sm font-bold text-motor-black">{user.displayName || 'User'}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                  
                  {userData?.role === "admin" && (
                    <Link to="/dashboard/manage_users" className="flex items-center px-3 py-3 rounded-lg text-primary-800 hover:bg-neutral-100" onClick={() => setIsOpen(false)}>
                      <LayoutDashboard className="w-5 h-5 mr-3 text-neutral-400" /> Dashboard
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center px-3 py-3 rounded-lg text-primary-800 hover:bg-neutral-100" onClick={() => setIsOpen(false)}>
                    <User className="w-5 h-5 mr-3 text-neutral-400" /> Profile
                  </Link>
                  <Link to="/orders" className="flex items-center px-3 py-3 rounded-lg text-primary-800 hover:bg-neutral-100" onClick={() => setIsOpen(false)}>
                    <Package className="w-5 h-5 mr-3 text-neutral-400" /> My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-3 rounded-lg text-motor-red hover:bg-red-50 mt-2"
                  >
                    <LogOut className="w-5 h-5 mr-3" /> Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block text-center bg-motor-red text-white px-3 py-3 rounded-lg font-medium mt-4 shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
