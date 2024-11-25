import React from "react";
import googlePlay from "../../assets/google-play.svg.png";
import amazonPay from "../../assets/amazon-pay.png";
import AmericanExpress from "../../assets/american-express.png";
import payPal from "../../assets/paypal.png";
import masterCard from "../../assets/card.png";
import appStore from "../../assets/app-store.png";

export default function Footer() {
  return (
    <footer className="bg-gray-300 py-6 px-4 w-full fixed bottom-0 end-0 start-0">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-3 text-start">
          <h2 className="text-2xl font-semibold text-gray-800">
            Get the FreshCart app
          </h2>
          <p className="text-gray-600 font-light text-xl">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email .."
              className="flex-grow px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <button className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600 transition-colors text-sm">
              Share App Link
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-gray-400">
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              <span className="text-md text-gray-600 mr-2">
                Payment Partners
              </span>
              <img src={amazonPay} alt="Amazon Pay" className="h-12" />
              <img
                src={AmericanExpress}
                alt="American Express"
                className="h-12"
              />
              <img src={masterCard} alt="Mastercard" className="h-12" />
              <img src={payPal} alt="PayPal" className="h-12" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-md text-gray-600">
                Get deliveries with FreshCart
              </span>
              <a href="#" className="inline-block">
                <img
                  src={appStore}
                  alt="Download on App Store"
                  className="h-14"
                />
              </a>
              <a href="#" className="inline-block">
                <img
                  src={googlePlay}
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}