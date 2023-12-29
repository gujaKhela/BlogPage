import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../src/img/LOGO.png";
import blogImage from "../img/Blog.png"
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";

const Header = ({ isBlogPage = false }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate(); // Use useNavigate to navigate to different routes

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleAddBlogClick = () => {
    // Navigate to "/add_blog" when the "add Blog" button is clicked
    navigate("/add_blog");
  };

  return (
    <header className="">
      <div className="flex justify-between items-center w-11/12 mx-auto">
        <Link to="/" className="text-2xl font-bold">
          <img src={logoImage} alt="Logo" className="h-8" />
        </Link>

        {isLoggedIn ? (
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={handleAddBlogClick}
          >
            დაამატე ბლოგი
          </button>
        ) : (
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={openLoginModal}
          >
            შესვლა
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {!isBlogPage && (
        <>
          <div className="flex justify-between items-center mt-20 w-11/12 border-b mx-auto ">
            <p className="font-bold text-6xl text-black"> ბლოგი </p>
            <img src={blogImage} alt="Blog" />
          </div>

        </>
      )}
    </header>
  );
};

export default Header;
