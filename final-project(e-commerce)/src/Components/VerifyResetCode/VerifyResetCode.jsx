// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Bars } from "react-loader-spinner";
// import { Link } from "react-router-dom";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

// // Validation Schema using Yup
// const validationSchema = Yup.object({
//   resetCode: Yup.string()
//     .required("Reset code is required")
//     .length(6, "Reset code must be 6 characters long"), // Adjust the length according to your requirements
// });

// export default function VerifyResetCode() {
//   const [loading, setLoading] = useState(false);
//   const [isResetCodeVerified, setIsResetCodeVerified] = useState(false);

//   async function handleVerifyResetCode(values, { setSubmitting }) {
//     const { resetCode } = values;

//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
//         { resetCode }
//       );
//       toast.success("Reset code verified successfully!");
//       setIsResetCodeVerified(true); // Set the flag to true when the code is successfully verified
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.message || "Invalid reset code. Please try again.";
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
//       <h2 className="text-2xl font-medium mb-6">Verify Reset Code</h2>
//       <Formik
//         initialValues={{ resetCode: "" }}
//         validationSchema={validationSchema}
//         onSubmit={handleVerifyResetCode}
//       >
//         {({ isSubmitting }) => (
//           <Form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
//             {/* Reset Code Field */}
//             <div className="relative mb-6">
//               <Field
//                 type="text"
//                 id="resetCode"
//                 name="resetCode"
//                 placeholder=" "
//                 className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
//               />
//               <label
//                 htmlFor="resetCode"
//                 className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-700"
//               >
//                 Reset Code
//               </label>
//               {/* Error Message for Reset Code */}
//               <ErrorMessage
//                 name="resetCode"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
//               disabled={isSubmitting || loading}
//             >
//               {loading ? <Bars height={20} width={20} color="#fff" /> : "Verify Code"}
//             </button>
//           </Form>
//         )}
//       </Formik>

//       {/* Show Link to Reset Password Page after Successful Verification */}
//       {isResetCodeVerified && (
//         <div className="mt-4">
//           <Link to="/reset" className="text-green-500 hover:text-green-700">
//             Go to Reset Password Page
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

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
    .length(6, "Reset code must be 6 characters long"),
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
      toast.success("Reset code verified successfully!", {
        position: "bottom-center",
      });
      setIsResetCodeVerified(true);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid reset code. Please try again.";
      toast.error(errorMsg, {
        position: "bottom-center",
      });
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
        {({ setFieldValue, isSubmitting, values }) => {
          const handleInputChange = (e, index) => {
            const input = e.target.value;
            if (/^[0-9]?$/.test(input)) {
              const resetCodeArray = values.resetCode.split("");
              resetCodeArray[index] = input;
              const newResetCode = resetCodeArray.join("");
              setFieldValue("resetCode", newResetCode);

              if (input && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
              }
            }
          };

          const handleKeyDown = (e, index) => {
            if (e.key === "Backspace" && !values.resetCode[index] && index > 0) {
              document.getElementById(`input-${index - 1}`).focus();
            }
          };

          return (
            <Form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-6">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength="1"
                    value={values.resetCode[index] || ""}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ))}
              </div>

              {/* Error Message */}
              <ErrorMessage
                name="resetCode"
                component="div"
                className="text-red-500 text-sm mb-4 text-center"
              />

              {/* Submit Button */}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={isSubmitting || loading}
                >
                  {loading ? <Bars height={20} width={20} color="#fff" /> : "Verify Code"}
                </button>

                {/* Toast Container Placeholder */}
                <div id="toast-container" className="mt-4"></div>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* Show Link to Reset Password Page after Successful Verification */}
      {isResetCodeVerified && (
        <div className="mt-4">
          <Link to="/reset" className="text-green-500 hover:text-green-700">
            Go to Reset Password Page
          </Link>
        </div>
      )}
    </div>
  );
}
