import React, { useState, useEffect } from "react";
import SampleNextArrow from "./SampleNextArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../api/fetchData";
import { Card } from "flowbite-react";
import trimTextToWords from "./TextTrim";
// import Card from "./YourCard"; // Make sure to import the correct card component




const YourSliderComponent = ({ isHomePageLookLike, isBlogPage, }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await fetchData();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display three slides at a time
    slidesToScroll: 3, // Scroll three slides at a time
    nextArrow: <SampleNextArrow />, // Use the corrected component
    // prevArrow: <SamplePrevArrow />, // Custom prev arrow component
  };

  const cardClassName = "max-w-md flex-shrink-0 w-[408px] h-[620px]";

  return (
    <Slider {...settings}>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div className="card-container">
            {/* Your card component goes here */}

            <div key={blog.id} className="card-container">
              <Card className={cardClassName}>
                <img
                  className="w-full h-40 object-cover"
                  src={blog.image}
                  alt={blog.alt}
                  style={{ maxHeight: "200px" }} 
                />
                <p className="text-[16px] leading-[20px] text-start">
                  {blog.author}
                </p>
                <p className="font-small text-[#85858D] text-start">
                 
                   {blog.publish_date}`
                    
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
                   ${trimTextToWords(blog.description, 12)}
                    
                </p>
                {isHomePageLookLike && (
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-[#5D37F3] flex items-center gap-2 text-[14px]"
                  >
                    სრულად ნახვა
                    <img src={Arrow} alt="Arrow" />
                  </Link>
                )}
              </Card>
    
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default YourSliderComponent;
