import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(users);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);


  const makeAdmin = (userId) => {
    console.log(`Making admin ${userId}`);
    // Add your logic here
  };
  const handleDeleteUser = (userId) => {
    console.log(`Deleting user ${userId}`);
    // Add your logic here
  };

  return (
    <div
      className="rounded-lg shadow-lg bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/wave-gradient-blue-background-modern-design_343694-3806.jpg?t=st=1726540548~exp=1726544148~hmac=4872cd591e58c968c4387dbc1f8c5759b3523815eaa281ec5c7cfc73a3e83fb3&w=1380",
      }}
    >
      <div className="container mx-auto p-4">
        <div className="grid justify-items-center">
          <div className="text-center my-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 drop-shadow-lg">
              Manage Users
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 mt-4">
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
                  <th className="py-3 px-5 text-sm font-medium">User's ID</th>
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
                        onClick={() => makeAdmin(user.uid)}
                        className="bg-green-500 text-white py-1 px-3 rounded-full mr-2 hover:bg-green-600 transition duration-200"
                      >
                        Make Admin
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

export default UsersPage;
