import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../src/img/LOGO.png";
import blogImage from "../../src/img/blog.png";
import Navbars from "./Navbars";

const Header = ({ isBlogPage = false }) => {
  return (
    <header className="">
      <div className="flex justify-between items-center  w-11/12  mx-auto">
        <Link to="/" className="text-2xl font-bold">
          <img src={logoImage} alt="Logo" className="h-8" />
        </Link>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          შესვლა
        </button>
      </div>
      {!isBlogPage && (
        <>
          <div className="flex justify-between items-center mt-20 w-11/12 border-b mx-auto ">
            <p className="font-bold text-6xl text-black"> ბლოგი </p>

            <img src={blogImage} alt="Blog" />
          </div>

          <Navbars />
        </>
      )}
    </header>
  );
};

export default Header;
