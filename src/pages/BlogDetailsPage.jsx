// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import CustomCard from "../components/MyCard";
import BlogDetails from "../components/BlogDetail";
import ArrowBack from "../img/ArrowBack.png"

const Blog = () => {
  return (
    <>
   <BlogDetails />
        
   <Link to="/" className="back-arrow" style={{ position: "absolute", top: "120px", left: "76px" }}>
        <img src={ArrowBack} alt="Back" />
      </Link>
    </>
  );
};

export default Blog;
