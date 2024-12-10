import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true); // Show spinner while fetching data
    axios
      .get("https://sumonmoto-parts-server.onrender.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch users!",
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdminStatus = (userId) => {
    axios
      .put(`https://sumonmoto-parts-server.onrender.com/users/${userId}`, {
        toggleRole: true,
      }) // Send a flag to toggle the role
      .then((response) => {
        const updatedUser = response.data;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `User role updated to ${updatedUser.role}!`,
        });
        fetchUsers(); // Refetch users data after update
      })
      .catch((error) => {
        console.error("Error toggling user role:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update user role!",
        });
      });
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://sumonmoto-parts-server.onrender.com/users/${userId}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The user has been deleted.",
            });
            fetchUsers(); // Refetch users data after deletion
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete user!",
            });
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="container mx-auto p-4">
        <div className="grid justify-items-center">
          <div className="text-center my-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-600 drop-shadow-lg">
              Manage Users
            </h1>
            <p className="text-lg sm:text-xl mt-4 text-gray-700">
              Delete user or give them Admin access!
            </p>
          </div>
          <div className="pb-4">
            <span className="inline-block w-40 h-1 bg-red-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-pink-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-purple-500 rounded-full"></span>
          </div>
        </div>

        {loading ? (
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
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-3 px-5 text-sm font-medium">Name</th>
                  <th className="py-3 px-5 text-sm font-medium">Email</th>
                  <th className="py-3 px-5 text-sm font-medium">User ID</th>
                  <th className="py-3 px-5 text-sm font-medium">Role</th>
                  <th className="py-3 px-5 text-sm font-medium text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.uid} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-5 text-gray-700">{user.name}</td>
                    <td className="py-4 px-5 text-gray-700">{user.email}</td>
                    <td className="py-4 px-5 text-gray-700 whitespace-nowrap">
                      {user.uid}
                    </td>
                    <td className="py-4 px-5 text-gray-700">{user.role}</td>
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <button
                        onClick={() => toggleAdminStatus(user.uid)}
                        className={`${
                          user.role === "admin"
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white py-1 px-3 rounded-full mr-2 transition duration-200`}
                      >
                        {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.uid)}
                        className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
                      >
                        Delete User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
