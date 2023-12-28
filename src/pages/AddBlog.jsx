import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../img/LOGO.png";
import ArrowBack from "../img/ArrowBack.png"
import BlogForm from "../components/BlogFormComponent";

const CreateBlogPage = () => {
  return (
    <>
      <div className="h-[80px] border-2 rounded w-full absolute top-0 left-0 flex items-center justify-center">
        <Link to="/">
          <img src={logoImage} alt="Logo" className="" />
        </Link>
      </div>
      <div className="mt-16">
        <BlogForm />
      </div>

      <Link to="/" className="back-arrow" style={{ position: "absolute", top: "120px", left: "76px" }}>
        <img src={ArrowBack} alt="Back" />
      </Link>
    </>
  );
};

export default CreateBlogPage;
