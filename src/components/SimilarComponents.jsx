import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YourSliderComponent from "./YourSliderComponent";


const SimilarComponents = ({categoryId}) => {
  return (
    <div className="w-11/12 m-10 relative">
         <p className="text-left text-2xl font-bold my-10">მსგავსი სტატიები
         </p>

         <YourSliderComponent categoryId={categoryId} />
    </div>
  );
};


export default SimilarComponents;
