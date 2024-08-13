import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const {sendPasswordReset} = useContext(AuthContext);
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await sendPasswordReset(email);
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Email Sent',
        text: 'Please check your email to reset your password.',
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An error occurred while trying to reset your password.',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-sm text-gray-800" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-2 p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
