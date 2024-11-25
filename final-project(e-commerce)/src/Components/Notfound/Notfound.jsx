import React, { useState, useEffect} from "react";
import notFound from '../../assets/error.svg'
import Style from "./Notfound.module.css";
export default function Notfound() {
  return (
    <>
     <div className="container mx-auto flex items-center justify-center">
      <img src={notFound} alt="Not Found image" />
     </div>
    </>
  );
}
