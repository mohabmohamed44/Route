import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast"; // Import Flowbite's Toast utility
import { CreditCard, MapPin, Phone } from "lucide-react";
import { cartContext } from "../../Context/CartContext";

// Validation schema using Yup
const PaymentSchema = Yup.object().shape({
  shippingAddress: Yup.object().shape({
    details: Yup.string()
      .required("Address details are required")
      .min(5, "Address details must be at least 5 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be 11 digits"),
    city: Yup.string()
      .required("City is required")
      .min(2, "City name must be at least 2 characters"),
  }),
});

export default function Payment() {
  let token = localStorage.getItem("token");
  let { cartId } = useContext(cartContext);
  // Initial values
  const initialValues = {
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
    },
  };

  // Handle cash payment
  function handleCashPayment(values) {
    console.log(values);
    const apiObj = {
      shippingAddress: values.shippingAddress,
    };

    axios
      .post(
        `https://www.ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        apiObj,
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // Show success toast
        toast.success("Payment successful!");
      })
      .catch((err) => {
        console.log(err);
        // Show error toast
        toast.error("Payment failed. Please try again.");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-green-500 text-white p-6 text-center">
          <CreditCard className="mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-bold">Complete Your Payment</h2>
          <p className="text-green-100 mt-2">
            Please provide your shipping details
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={PaymentSchema}
          onSubmit={handleCashPayment}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="p-6 space-y-6">
              {/* Details Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="text-green-500" size={20} />
                </div>
                <Field
                  type="text"
                  name="shippingAddress.details"
                  id="details"
                  className={`pl-10 block w-full rounded-lg border-2 px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    touched.shippingAddress?.details &&
                    errors.shippingAddress?.details
                      ? "border-red-500 ring-2 ring-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Address Details"
                />
                <ErrorMessage
                  name="shippingAddress.details"
                  component="div"
                  className="text-red-500 text-sm mt-1 pl-10"
                />
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="text-green-500" size={20} />
                </div>
                <Field
                  type="text"
                  name="shippingAddress.phone"
                  id="phone"
                  className={`pl-10 block w-full rounded-lg border-2 px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    touched.shippingAddress?.phone &&
                    errors.shippingAddress?.phone
                      ? "border-red-500 ring-2 ring-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Phone Number"
                />
                <ErrorMessage
                  name="shippingAddress.phone"
                  component="div"
                  className="text-red-500 text-sm mt-1 pl-10"
                />
              </div>

              {/* City Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="text-green-500" size={20} />
                </div>
                <Field
                  type="text"
                  name="shippingAddress.city"
                  id="city"
                  className={`pl-10 block w-full rounded-lg border-2 px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    touched.shippingAddress?.city &&
                    errors.shippingAddress?.city
                      ? "border-red-500 ring-2 ring-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="City"
                />
                <ErrorMessage
                  name="shippingAddress.city"
                  component="div"
                  className="text-red-500 text-sm mt-1 pl-10"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white p-3.5 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex justify-center items-center">
                    <Bars
                      color="#ffffff"
                      height={24}
                      width={24}
                      ariaLabel="loading"
                    />
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <CreditCard className="mr-2" size={20} />
                    Complete Payment
                  </span>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
