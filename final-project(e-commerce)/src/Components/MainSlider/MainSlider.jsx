import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Style from "./MainSlider.module.css";
import Slide_1 from "../../assets/images/slider-image-1.jpeg";
import Slide_2 from "../../assets/images/slider-image-2.jpeg";
import Slide_3 from "../../assets/images/slider-image-3.jpeg";
import grocery1 from "../../assets/images/grocery-banner.png";
import grocery2 from "../../assets/images/grocery-banner-2.jpeg";
export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] mb-10">
        <div className="overflow-hidden">
          <Slider {...settings} className="mb-10">
            <div>
              {" "}
              <img
                src={Slide_1}
                alt="grocery"
                className="w-[100%] h-[200px] object-cover"
              />
            </div>
            <div>
              {" "}
              <img
                src={Slide_2}
                alt="grocery"
                className="w-[100%] h-[200px] object-cover"
              />
            </div>
            <div>
              {" "}
              <img
                src={Slide_3}
                alt="grocery"
                className="w-[100%] h-[200px] object-cover"
              />
            </div>
          </Slider>
        </div>
        <div>
          <img
            src={grocery1}
            alt="Grocery Banner"
            className="w-full h-[100px] object-cover"
          />
          <img
            src={grocery2}
            alt="Grocery Banner"
            className="w-full h-[100px] object-cover"
          />
        </div>
      </div>
    </>
  );
}
