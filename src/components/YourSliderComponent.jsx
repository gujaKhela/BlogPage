import React, { useState, useEffect } from "react";
import SampleNextArrow from "./SampleNextArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../api/fetchData";
import { Card } from "flowbite-react";
import trimTextToWords from "./TextTrim";
// import Card from "./YourCard"; // Make sure to import the correct card component

const YourSliderComponent = ({
  isHomePageLookLike,
  isBlogPage,
  categoryId,
}) => {
  const [blogs, setBlogs] = useState([]);
  const [categoriesId, setCategoriesId] = useState([]);

  useEffect(() => {
    // Extract category IDs from the array of categories
    const categoryIds = categoryId.map((category) => category.id);
    console.log("categoriesId:", categoryIds);
    setCategoriesId(categoryIds);
  }, [categoryId]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await fetchData();
        console.log("All Blogs:", allBlogs);

        // Filter blogs based on category IDs
        const filteredBlogs = allBlogs.filter((blog) =>
          blog.categories.some((category) => categoriesId.includes(category.id))
        );

        console.log("Filtered Blogs:", filteredBlogs);
        setBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    // Fetch blogs only when categoriesId is updated
    if (categoriesId.length > 0) {
      fetchBlogs();
    }
  }, [categoriesId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display three slides at a time
    slidesToScroll: 3, // Scroll three slides at a time
    nextArrow: <SampleNextArrow style={{ position: "absolute", top: "10%", right: "5%" }} />,
 // Move next arrow to top right
    // prevArrow: <SamplePrevArrow />, // Custom prev arrow component
  };

  const cardClassName = "max-w-md flex-shrink-0 w-[408px] h-[620px]";

  return (
    <Slider {...settings}>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {" "}
          <div className="card-container">
            {/* Your card component goes here */}

            <div key={blog.id} className="card-container">
              <div className="my-12">
                <img
                  className="object-cover w-[408px] h-[328px] rounded-lg"
                  src={blog.image}
                  alt={blog.alt}
                />
                <p className="text-[16px] font-bold mt-[20px]">
                  {" "}
                  {blog.author}
                </p>
                <p className="text-gray-600 mt-[10px] text-xs">
                  {blog.publish_date}
                </p>
                <div className="font-bold text-[20px] mt-[20px]">
                  {blog.title}
                </div>
                <p className="font-medium text-gray-600 mt-[10px] w-[408px]">
                  {blog.categories.map((bl) => (
                    <span
                      key={bl.id}
                      className={`text-sm inline-block rounded-full px-3 py-1 mr-2 mt-1`}
                      style={{
                        backgroundColor: bl.background_color,
                        color: bl.text_color,
                      }}
                    >
                      {bl.title}
                    </span>
                  ))}
                </p>
                <p className="text-gray-700 text-[16px] mt-[20px] truncate">
                  {isHomePageLookLike
                    ? `${trimTextToWords(blog.description, 12)}`
                    : ""}
                </p>
             
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default YourSliderComponent;
