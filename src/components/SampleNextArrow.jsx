// SampleNextArrow.jsx
import  SampleNextA from "../img/SampleNextA.png"
import React from "react";

const SampleNextArrow = (props) => {
  const { onClick } = props;

  return (
    <div className="arrow next" onClick={onClick}>
      <img src={SampleNextA} alt="Next" />
    </div>
  );
};

export default SampleNextArrow;
