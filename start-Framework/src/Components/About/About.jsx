import React from "react";
import StarSeparator from "../StarSeparator/StarSeparator";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center bg-mainColor gap-5 py-20  md:py-52 text-white">
      <div className="container py-36 px-10">
      <p className="text-white text-3xl md:text-4xl font-bold uppercase my-5 text-center">
        about component
      </p>
      <StarSeparator />
      <div className="grid md:grid-cols-2 mt-5 gap-4">
        <p className="text-start">
          Freelancer is a free bootstrap theme created by Route. The download
          includes the complete source files including HTML, CSS, and JavaScript
          as well as optional SASS stylesheets for easy customization.
        </p>
        <p className="text-start">
          Freelancer is a free bootstrap theme created by Route. The download
          includes the complete source files including HTML, CSS, and JavaScript
          as well as optional SASS stylesheets for easy customization.
        </p>
      </div>
      </div>
    </div>
  );
}