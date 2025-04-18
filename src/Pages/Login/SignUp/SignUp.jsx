import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProviders";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with Firebase
      const userCredential = await createUser(name, email, password);
      const user = userCredential.user;

      // Prepare the data to be sent to the server
      const userData = {
        uid: user.uid,
        name,
        email,
        photoURL: user.photoURL || "https://via.placeholder.com/150",
        role: "user",
        socialAccount: "",
        phone: "",
      };

      // Send the user data to your server using Axios
      const response = await axios.post(
        "https://sumonmoto-parts-server.onrender.com/users",
        userData
      );

      if (response.status === 200 || response.status === 201) {
        // Successfully saved to the server
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Verification email has been sent. Please check your inbox.",
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        // Errors returned from the server
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response.data.message ||
            "Failed to save user data to the server.",
        });
      } else {
        // Other errors (e.g., network issues or Firebase errors)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Something went wrong!",
        });
      }
    }
  };

  return (
    <section className="h-screen flex justify-center items-center backdrop-blur-lg">
      <div className="w-full max-w-sm p-6 my-8 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto">
          <h2>Create an Account</h2>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 my-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or login with Social Media
          </a>
          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <GoogleLogin></GoogleLogin>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
