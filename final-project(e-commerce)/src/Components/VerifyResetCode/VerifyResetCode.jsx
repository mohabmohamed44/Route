import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
  resetCode: Yup.string()
    .required("Reset code is required")
    .length(6, "Reset code must be 6 characters long"), // Adjust the length according to your requirements
});

export default function VerifyResetCode() {
  const [loading, setLoading] = useState(false);
  const [isResetCodeVerified, setIsResetCodeVerified] = useState(false);

  async function handleVerifyResetCode(values, { setSubmitting }) {
    const { resetCode } = values;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      toast.success("Reset code verified successfully!");
      setIsResetCodeVerified(true); // Set the flag to true when the code is successfully verified
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid reset code. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h2 className="text-2xl font-medium mb-6">Verify Reset Code</h2>
      <Formik
        initialValues={{ resetCode: "" }}
        validationSchema={validationSchema}
        onSubmit={handleVerifyResetCode}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
            {/* Reset Code Field */}
            <div className="relative mb-6">
              <Field
                type="text"
                id="resetCode"
                name="resetCode"
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              />
              <label
                htmlFor="resetCode"
                className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-700"
              >
                Reset Code
              </label>
              {/* Error Message for Reset Code */}
              <ErrorMessage
                name="resetCode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={isSubmitting || loading}
            >
              {loading ? <Bars height={20} width={20} color="#fff" /> : "Verify Code"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Show Link to Reset Password Page after Successful Verification */}
      {isResetCodeVerified && (
        <div className="mt-4">
          <Link to="/resetPassword" className="text-green-500 hover:text-green-700">
            Go to Reset Password Page
          </Link>
        </div>
      )}
    </div>
  );
}
