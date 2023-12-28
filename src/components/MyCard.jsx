import React, { useEffect } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import Arrow from "../img/Arrow.svg";
import trimTextToWords from "./TextTrim"
import { useMyArrayContext } from "../contexts/MyArrayContext";

const CustomCard = ({ isHomePageLookLike = false, blogs,isBlogPage = false }) => {
  const { myArray, toggleElementInMyArray } = useMyArrayContext();

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

  // Filter blogs based on selected categories
  const filteredBlogs =
    myArray.length > 0
      ? blogs.filter((blog) =>
          blog.categories.some((category) => myArray.includes(category.id))
        )
      : blogs;

  const cardClassName = isHomePageLookLike
    ? "max-w-md flex-shrink-0 w-[408px] h-[620px]"
    : "w-5/6 mx-auto my-10 w-[408px] h-[620px]";

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
              <p className="text-[16px] leading-[20px] text-start">
                {blog.author}
              </p>
              <p className="font-small text-[#85858D] text-start">
                {isHomePageLookLike
                  ? `${blog.publish_date}`
                  : `Publication Date: ${blog.publish_date} ${"gmail@@@com"}`}
              </p>
              <h4 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white text-left h-16 overflow-hidden">
                {blog.title}
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
              <p className="font-normal text-start text-gray-700 dark:text-gray-400">
                {isHomePageLookLike
                  ? `${trimTextToWords(blog.description, 12)}`
                  : ""}
              </p>
              {isHomePageLookLike && (
  <Link to={`/blogs/${blog.id}`} className="text-[#5D37F3] flex items-center gap-2 text-[14px]">
  სრულად ნახვა
  <img src={Arrow} alt="Arrow" />
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
