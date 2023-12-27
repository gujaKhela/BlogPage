// CustomCard.js

import React, { useEffect } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { useMyArrayContext } from "../contexts/MyArrayContext";
import { useQuery } from "react-query";
import { fetchData } from "../api/fetchData"; // Adjust the import statement

const CustomCard = ({ isHomePageLookLike = false, isBlogPage = false }) => {
  const { myArray, toggleElementInMyArray } = useMyArrayContext();

  // Fetch blogs using react-query
  const { data: blogs, error, isLoading } = useQuery(["blogs"], fetchData);

  // Load selected categories from local storage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem("selectedCategories");
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      parsedCategories.forEach((category) => toggleElementInMyArray(category));
    }
  }, []);

  // Save selected categories to local storage whenever myArray changes
  useEffect(() => {
    localStorage.setItem("selectedCategories", JSON.stringify(myArray));
  }, [myArray]); // Run only when myArray changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blogs: {error.message}</div>;
  }

  // Filter blogs based on selected categories
  const filteredBlogs =
    myArray.length > 0
      ? blogs.filter((blog) =>
          blog.categories.some((category) => myArray.includes(category.id))
        )
      : blogs;

  const cardClassName = isHomePageLookLike
    ? "max-w-md flex-shrink-0"
    : "w-5/6 mx-auto my-10";

  return (
    <>
      {filteredBlogs.length > 0 &&
        filteredBlogs.map((blog) => (
          <div key={blog.id} className="card-container">
            <Card className={cardClassName}>
              <img
                className="w-full h-40 object-cover"
                src={blog.image}
                alt={blog.alt}
                style={{ maxHeight: "200px" }} // Fixed height for the image
              />
              <p className="text-left pl-4 text-xs mt-2 h-8 overflow-hidden">
                {blog.author}
              </p>
              <p className="date text-left pl-4 text-gray-500">
                {isHomePageLookLike
                  ? `${blog.publish_date}`
                  : `Publication Date: ${blog.publish_date} ${"gmail@@@com"}`}
              </p>
              <h4 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white text-left h-16 overflow-hidden">
                {blog.description}
              </h4>
              <div className="flex justify-between pl-4 pr-4">
                <ul className="flex flex-wrap justify-center space-x-4 mb-4">
                  {blog.categories.map((bl) => (
                    <li
                      key={bl.id}
                      className="py-2 px-4 rounded-full m-2"
                      style={{
                        backgroundColor: bl.background_color,
                        color: bl.text_color,
                      }}
                    >
                      {bl.title}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {isHomePageLookLike
                  ? "mokle agwera--mag Here are the biggest enterprise technology acquisitions of 2021 so"
                  : ""}
              </p>
              {isHomePageLookLike && (
                <Link to="/full-description" className="button">
                  სრულად ნახვა
                </Link>
              )}
            </Card>
            {isBlogPage && (
              <div className="w-10/12 mx-auto ">
                <span className=""></span>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default CustomCard;
