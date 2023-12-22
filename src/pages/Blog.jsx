// Home.jsx
import React from "react";
import Header from "../components/Header";
import CustomCard from "../components/MyCard";
import SimilarComponents from "../components/SimilarComponents";

const Blog = () => {
  return (
    <>
      <Header isBlogPage={true} />
      <main className="	">
        <CustomCard isBlogPage={true} />
        <SimilarComponents />
        <div className="flex flex-wrap gap-20 justify-center">
          <CustomCard isHomePageLookLike={true} />
          <CustomCard isHomePageLookLike={true} />
          <CustomCard isHomePageLookLike={true} />
        </div>
      </main>
    </>
  );
};

export default Blog;
