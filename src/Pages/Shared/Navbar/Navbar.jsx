import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../../Firebase/firebase.config";

const auth = getAuth(app);

const defaultAvatar = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"; // Update with the path to your default avatar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "You have successfully logged out.",
    });
  };

  const isActive = (path) =>
    location.pathname === path
      ? "border-indigo-500 text-gray-900"
      : "border-transparent text-gray-500 hover:text-gray-700";

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
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                "/products"
              )}`}
            >
              Products
            </Link>
            <Link
              to="/portfolio"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                "/portfolio"
              )}`}
            >
              Portfolio
            </Link>

            {user ? (
              <div className="relative inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              <div className="relative flex items-center my-auto">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-1 pt-1 text-sm font-medium focus:outline-none"
                >
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user.displayName || user.email}</span>
                  <span className="ml-2">&#x25bc;</span>
                </button>
            
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-lg shadow z-10">
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/add_review"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Add A Review
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            ) : (
              <Link
                to="/login"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                  "/login"
                )}`}
              >
                Login
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/products"
            )}`}
          >
            Products
          </Link>
          <Link
            to="/portfolio"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/portfolio"
            )}`}
          >
            Portfolio
          </Link>
          {user ? (
            <>
              <button
                onClick={toggleDropdown}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                  "/dashboard"
                )}`}
              >
                {user.displayName || user.email}
              </button>
              {isDropdownOpen && (
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/add_review"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                   Add A Review
                  </Link>
                </div>
              )}
              <button
                onClick={handleLogout}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                  "/logout"
                )}`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                "/login"
              )}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
