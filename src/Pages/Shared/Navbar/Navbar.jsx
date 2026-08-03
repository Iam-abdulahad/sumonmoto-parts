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
      confirmButtonColor: "#F97316", // accent-500
      cancelButtonColor: "#64748B", // neutral-500
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
      ? "text-accent-500 font-semibold"
      : "text-neutral-700 hover:text-accent-500 transition-colors";

  const isMobileActive = (path) =>
    location.pathname === path
      ? "text-accent-500 font-semibold bg-neutral-50"
      : "text-neutral-700 hover:text-accent-500 hover:bg-neutral-50";

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
    <nav className="bg-white shadow-sm sticky top-0 z-50 transition-all border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold font-heading text-primary-900 tracking-tight">
              SumonMoto<span className="text-accent-500">.</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/products" className={isActive("/products")}>Products</Link>
            <Link to="/contact" className={isActive("/contact")}>Contact</Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="text-neutral-700 hover:text-accent-500 transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="text-neutral-700 hover:text-accent-500 transition-colors relative" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-accent-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-full"
                >
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-neutral-200 object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50 overflow-hidden transform transition-all origin-top-right">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium text-neutral-900 truncate">{user.displayName || 'User'}</p>
                      <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                    </div>
                    
                    <div className="py-1">
                      {userData?.role === "admin" && (
                        <Link to="/dashboard/manage_users" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-500">
                          <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                        </Link>
                      )}
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-500">
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Link>
                      <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-500">
                        <Package className="w-4 h-4 mr-2" /> Orders
                      </Link>
                      <Link to="/add_review" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-500">
                        <Star className="w-4 h-4 mr-2" /> Review
                      </Link>
                    </div>
                    
                    <div className="border-t border-neutral-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-danger-500 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-neutral-700 relative">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-neutral-500 hover:text-neutral-900 focus:outline-none p-1 rounded-md"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden transform transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-neutral-100 shadow-inner">
          <Link to="/" className={`block px-3 py-2.5 rounded-lg ${isMobileActive("/")}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className={`block px-3 py-2.5 rounded-lg ${isMobileActive("/products")}`} onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/contact" className={`block px-3 py-2.5 rounded-lg ${isMobileActive("/contact")}`} onClick={() => setIsOpen(false)}>Contact</Link>
          
          <div className="border-t border-neutral-200 my-2 pt-2">
            {user ? (
              <>
                <div className="px-3 py-2 flex items-center space-x-3 mb-2">
                  <img src={user.photoURL || defaultAvatar} alt="" className="w-10 h-10 rounded-full border border-neutral-200 object-cover" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{user.displayName || 'User'}</p>
                    <p className="text-xs text-neutral-500">{user.email}</p>
                  </div>
                </div>
                
                {userData?.role === "admin" && (
                  <Link to="/dashboard/manage_users" className="flex items-center px-3 py-2.5 rounded-lg text-neutral-700 hover:bg-neutral-50" onClick={() => setIsOpen(false)}>
                    <LayoutDashboard className="w-5 h-5 mr-3 text-neutral-400" /> Dashboard
                  </Link>
                )}
                <Link to="/profile" className="flex items-center px-3 py-2.5 rounded-lg text-neutral-700 hover:bg-neutral-50" onClick={() => setIsOpen(false)}>
                  <User className="w-5 h-5 mr-3 text-neutral-400" /> Profile
                </Link>
                <Link to="/orders" className="flex items-center px-3 py-2.5 rounded-lg text-neutral-700 hover:bg-neutral-50" onClick={() => setIsOpen(false)}>
                  <Package className="w-5 h-5 mr-3 text-neutral-400" /> My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2.5 rounded-lg text-danger-500 hover:bg-red-50 mt-1"
                >
                  <LogOut className="w-5 h-5 mr-3" /> Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-center bg-accent-500 text-white px-3 py-2.5 rounded-lg font-medium mt-4"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
