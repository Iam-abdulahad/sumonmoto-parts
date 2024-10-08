import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProviders";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Assuming you have this component
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "You have successfully logged in.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(email);
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Check your email for a link to reset your password.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <section className="h-screen flex justify-center items-center backdrop-blur-lg">
      <div className="w-full max-w-sm p-6 my-8 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto">
          <h2>Login</h2>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="text"
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
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                onClick={() => setModalOpen(true)} // Open the modal
              >
                Forget Password?
              </a>
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
              Sign In
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
          Don't have an account?{" "}
          <Link
            to="/sign_up"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>

      {/* Modal for Forget Password */}
      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        sendPasswordResetEmail={sendPasswordReset}
      />
    </section>
  );
};

export default Login;
