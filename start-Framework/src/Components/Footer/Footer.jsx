import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-secColor text-white p-20 bottom-0">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="col-span-1">
              <h3 className="font-semibold text-3xl md:text-4xl my-3">
                LOCATION
              </h3>
              <p>2215 John Daniel Drive</p>
              <p className="mt-2">Clark, MO 65243</p>
            </div>
            <div className="col-span-1">
              <h3 className="font-semibold text-2xl md:text-3xl my-4">
                AROUND THE WEB
              </h3>
              <ul className="flex gap-4 w-full justify-center text-xl">
                <li className="border border-white rounded-full flex items-center hover:bg-teal-500 duration-300 cursor-pointer">
                  <a href="https://github.com/mohabmohamed44" target="_blank">
                    <i className="fab fa-github m-3"></i>
                  </a>
                </li>
                <li className="border border-white rounded-full flex items-center hover:bg-teal-500 duration-300 cursor-pointer">
                  <a href="https://www.linkedin.com/in/mohab-mahmoud-402060224/" target="_blank">
                    <i className="fa-brands fa-linkedin-in m-3" />
                  </a>
                </li>
                <li className="border border-white rounded-full flex items-center hover:bg-teal-500 duration-300 cursor-pointer">
                  <a href="https://www.facebook.com" target="_blank">
                    <i className="fab fa-facebook m-3"></i>
                  </a>
                </li>
                <li className="border border-white rounded-full flex items-center hover:bg-teal-500 duration-300 cursor-pointer">
                  <a href="https://www.twitter.com" target="_blank">
                    <i className="fab fa-twitter m-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="my-3 font-semibold text-2xl md:text-3xl">
                ABOUT FREELANCER
              </h3>
              <p>
                Freelance is a free to use, licensed Bootstrap theme created by
                Route
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white p-5 text-center">
        <p>Copyright © Your Website 2021</p>
      </div>
    </>
  );
}
