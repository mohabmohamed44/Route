import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import Style from "./ResetPassword.module.css";

export default function ResetPassword() {
  const [resetCode, setResetCode] = useState(""); // Using setResetCode to manage state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission for password reset
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    // Check if resetCode is provided
    if (!resetCode) {
      setError("Reset code is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { resetCode }
      );
      toast.success("Password has been successfully reset.");
      navigate("/login"); // Redirect to login page after successful reset
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm bg-white p-6 rounded-lg shadow-md ${Style.form}`}
      >
        <div className="mb-4">
          <label htmlFor="resetCode" className="block text-gray-700 font-medium mb-2">
            Reset Code
          </label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            placeholder="Enter your reset code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)} // Handle resetCode change
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={loading}
        >
          {loading ? <Bars height={20} width={20} color="#fff" /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
