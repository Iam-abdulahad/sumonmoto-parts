import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../Firebase/firebase.config";
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
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen backdrop-blur-lg flex flex-col items-center p-4">
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

      {/* Manufacturing Details */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Manufacturing Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600">Department:</label>
            <p className="text-gray-800 font-medium">Machinery</p>
          </div>
          <div>
            <label className="text-gray-600">Experience:</label>
            <p className="text-gray-800 font-medium">10 Years</p>
          </div>
          <div>
            <label className="text-gray-600">Projects:</label>
            <p className="text-gray-800 font-medium">
              Designing advanced CNC machines
            </p>
          </div>
          <div>
            <label className="text-gray-600">Certifications:</label>
            <p className="text-gray-800 font-medium">
              Lean Six Sigma, ISO 9001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
