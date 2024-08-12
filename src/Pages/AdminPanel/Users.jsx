import { useState, useEffect } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
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

  const handleMakeAdmin = (userId) => {
    console.log(`Making user ${userId} an admin`);
    // Add your logic here
  };

  const handleDeleteUser = (userId) => {
    console.log(`Deleting user ${userId}`);
    // Add your logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        Users Management
      </h1>

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
                <th className="py-3 px-5 text-sm font-medium">ID</th>
                <th className="py-3 px-5 text-sm font-medium">Name</th>
                <th className="py-3 px-5 text-sm font-medium">Email</th>
                <th className="py-3 px-5 text-sm font-medium">Role</th>
                <th className="py-3 px-5 text-sm font-medium text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5 text-gray-700 whitespace-nowrap">
                    {user.id}
                  </td>
                  <td className="py-4 px-5 text-gray-700">{user.name}</td>
                  <td className="py-4 px-5 text-gray-700">{user.email}</td>
                  <td className="py-4 px-5 text-gray-700">{user.role}</td>
                  <td className="py-4 px-5 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleMakeAdmin(user.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded-full mr-2 hover:bg-green-600 transition duration-200"
                    >
                      Make Admin
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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
  );
};

export default UsersPage;
