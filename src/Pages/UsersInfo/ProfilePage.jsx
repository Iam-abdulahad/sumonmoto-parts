import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";
import { app } from "../../Firebase/firebase.config";

const auth = getAuth(app);

const defaultAvatar =
  "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  // console.log(userData.name)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Load user data from the database
        axios
          .get(`https://sumonmoto-parts-server.onrender.com/user/${currentUser.uid}`)
          .then((response) => setUserData(response.data))
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to load user data. Please try again.",
            });
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdateProfile = () => {
    axios
      .put(`https://sumonmoto-parts-server.onrender.com/users/${user.uid}`, updatedData)
      .then((response) => {
        setUserData(response.data);
        setIsEditModalOpen(false);
        setUpdatedData({});
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated!",
        });
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Could not update profile. Please try again.",
        });
      });
  };

  if (!user || !userData) {
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
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <img
            className="w-24 h-24 rounded-full mr-4 border-4 border-blue-400"
            src={userData.photoURL || defaultAvatar}
            alt="Profile"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {userData.name || "John Doe"}
            </h1>
            <p className="text-gray-600">{userData.email}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-gray-800 rounded hover:bg-blue-600"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </button>
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
              {userData.name || "John Doe"}
            </p>
          </div>
          <div>
            <label className="text-gray-600">Email:</label>
            <p className="text-gray-800 font-medium">{userData.email}</p>
          </div>
          <div>
            <label className="text-gray-600">Phone:</label>
            <p className="text-gray-800 font-medium">
              {userData.phoneNumber || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-gray-600">Location:</label>
            <p className="text-gray-800 font-medium">
              {userData.location || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-gray-600">Social Account: </label>
            {userData.socialAccount ? (
              <a
                href={
                  userData.socialAccount.startsWith("http")
                    ? userData.socialAccount
                    : `https://${userData.socialAccount}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {userData.socialAccount}
              </a>
            ) : (
              <p className="text-gray-800 font-medium">N/A</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white max-w-sm w-full p-6 sm:p-8 rounded-lg shadow-lg transform transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              Edit Profile
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userData.name}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Phone:
                </label>
                <input
                  type="number"
                  name="phone"
                  defaultValue={userData.phone}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Location:
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={userData.location}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Photo URL:
                </label>
                <input
                  type="text"
                  name="photoURL"
                  defaultValue={userData.photoURL}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Social Account URL:
                </label>
                <input
                  type="text"
                  name="socialAccount"
                  defaultValue={userData.socialAccount}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <button
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium px-4 py-2 rounded-lg transition duration-200"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                onClick={handleUpdateProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
