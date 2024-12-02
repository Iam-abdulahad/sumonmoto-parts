import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app}from "../../Firebase/firebase.config";
// import { auth } from "../firebase";

const auth = getAuth(app);

const defaultAvatar =
  "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg flex flex-col items-center p-4">
      {/* Header */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <img
            className="w-24 h-24 rounded-full mr-4 border-4 border-blue-400"
            src={user.photoURL || { defaultAvatar }}
            alt="Profile"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user.displayName || "John Doe"}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600">Full Name:</label>
            <p className="text-gray-800 font-medium">
              {user.displayName || "John Doe"}
            </p>
          </div>
          <div>
            <label className="text-gray-600">Email:</label>
            <p className="text-gray-800 font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-gray-600">Phone:</label>
            <p className="text-gray-800 font-medium">
              {user.phoneNumber || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-gray-600">Location:</label>
            <p className="text-gray-800 font-medium">N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
