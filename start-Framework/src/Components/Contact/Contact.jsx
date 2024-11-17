import React, { useState } from "react";
import StarSeparator from "../StarSeparator/StarSeparator";
export default function Contact() {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container py-48 mx-auto text-secColor flex flex-col">
      <h5 className="font-bold text-4xl text-center uppercase mb-4 my-4">
        Contact Section
      </h5>
      <StarSeparator borderColor="border-secColor" starColor="text-secColor" />
      <form className="py-20 mx-auto w-3/4 flex flex-col gap-8">
        <div className="relative z-0">
          <input
            type="text"
            id="floating_standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="block  py-2.5 px-0 w-full text-md text-gray-900 bg-white border-0 border-b-2 rounded-md focus:outline-none appearance-none peer"
            placeholder="User Name"
          />
          <label
            htmlFor="floating_standard"
            className={`absolute text-xl duration-300 transform ${
              userName ? "-translate-y-6 scale-75" : "translate-y-3 scale-100"
            } top-0 -z-10 origin-[0] peer-focus:start-0 text-mainColor`}
          >
            User Name:
          </label>
        </div>
        <div className="relative z-0">
          <input
            type="number"
            id="userAge"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-white border-0 border-b-2 rounded-md focus:outline-none appearance-none peer"
            placeholder="User Age"
          />
          <label
            htmlFor="userAge"
            className={`absolute text-xl duration-300 transform ${
              userAge ? "-translate-y-6 scale-75" : "translate-y-3 scale-100"
            } top-0 -z-10 origin-[0] peer-focus:start-0 text-mainColor`}
          >
            User Age:
          </label>
        </div>
        <div className="relative z-0">
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-white border-0 border-b-2 rounded-md focus:outline-none appearance-none peer"
            placeholder="User Email"
          />
          <label
            htmlFor="userEmail"
            className={`absolute text-xl duration-300 transform ${
              userEmail ? "-translate-y-6 scale-75" : "translate-y-3 scale-100"
            } top-0 -z-10 origin-[0] peer-focus:start-0 text-mainColor`}
          >
            User Email:
          </label>
        </div>
        <div className="relative z-0">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-white border-0 border-b-2 rounded-md focus:outline-none appearance-none peer"
            placeholder="User Password"
          />
          <label
            htmlFor="password"
            className={`absolute text-xl duration-300 transform ${
              password ? "-translate-y-6 scale-75" : "translate-y-3 scale-100"
            } top-0 -z-10 origin-[0] peer-focus:start-0 text-mainColor`}
          >
            User Password:
          </label>
        </div>
        <button
          type="button"
          className="p-2 text-lg rounded-lg bg-mainColor cursor-pointer outline-0 text-white w-fit active:scale-90 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
