import React from "react";

export default function StarSeparator({
  borderColor = "border-white",
  starColor = "text-white",
}) {
  return (
    <div className="flex items-center justify-center">
      <div className={`border-t-4 ${borderColor} w-24 mx-2`}></div>
      <i className={`fa-solid fa-star ${starColor}`} />
      <div className={`border-t-4 ${borderColor} w-24 mx-2`}></div>
    </div>
  );
}
