import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Arrow from "../img/Arrow.svg";
import trimTextToWords from "./TextTrim";
import { useMyArrayContext } from "../contexts/MyArrayContext";

const CustomCard = ({
  isHomePageLookLike = false,
  blogs,
  isBlogPage = false,
}) => {
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
    

  return (
    <>
      {filteredBlogs.length > 0 &&
        filteredBlogs.map((blog) => (
          <div key={blog.id} className="max-w-[408px]">
            <div className="my-12" >
              <img
                className="object-cover w-[408px] h-[328px] rounded-lg"
                src={blog.image}
                alt={blog.alt}
              />
              <p className="text-[16px] font-bold mt-[20px]"> {blog.author}</p>
              <p className="text-gray-600 mt-[10px] text-xs">
                {blog.publish_date}
              </p>
              <div className="font-bold text-[20px] mt-[20px]">
                {blog.title}
              </div>
              <ul className="font-medium text-gray-600 mt-[10px] w-[408px]">
                {blog.categories.map((bl) => (
                  <li
                    key={bl.id}
                    className={`text-sm inline-block rounded-full px-3 py-1 mr-2 mt-1`}
                    style={{
                      backgroundColor: bl.background_color,
                      color: bl.text_color,
                    }}
                  >
                    {bl.title}
                  </li>
                ))}
              </ul>
              <p className="text-[#404049
] text-[16px] mt-[20px] truncate">
                
                  {trimTextToWords(blog.description, 10)}
                  
              </p>
              {isHomePageLookLike && (
                <Link to={`/blogs/${blog.id}`}>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-bold cursor-pointer mt-[18px] text-[#5d37f3]">
                      სრულად ნახვა
                    </p>
                    <img
                      src={Arrow}
                      className="mt-3 w-[20px] h-[18px]"
                      alt="Arrow"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default CustomCard;
