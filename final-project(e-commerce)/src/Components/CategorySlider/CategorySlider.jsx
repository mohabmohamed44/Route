import React, { useState, useEffect } from "react";
import Style from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null); // Ensure it's initialized as an array

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);

      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>
      <Slider {...settings}>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="flex flex-col mb-10 items-center justify-center ">
              <img src={category.image} className="w-full h-[200px] object-cover" alt={category.name} />
              <h3 className="font-medium text-gray-800">{category.name}</h3>
            </div>
          ))
        ) : (
          <div>No categories available</div> // Show a message if categories is empty or undefined
        )}
      </Slider>
    </>
  );
}
