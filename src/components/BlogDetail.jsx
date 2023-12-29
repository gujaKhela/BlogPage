// BlogDetails.jsx

import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/fetchData"; // Adjust the import path
import SimilarComponents from "./SimilarComponents";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        // Assuming fetchData returns an array of blog posts
        const blogs = await fetchData();

        // Find the blog post with the matching id
        const matchedBlog = blogs.find((blog) => blog.id === parseInt(id, 10));

        if (matchedBlog) {
          setBlogDetail(matchedBlog);
        } else {
          console.error(`Blog with id ${id} not found.`);
        }
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (!blogDetail) {
    return <div>Loading...</div>;
  }

  const { title, description, author, publish_date, categories, image } =
    blogDetail;

  return (
    <>
      <Header isBlogPage={true} />
      <div
        style={{
          width: "720px",
          height: "1152px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        <img
          src={image}
          alt={title}
          className="rounded"
          style={{
            width: "100%",
            height: "328px",
            objectFit: "cover",
          }}
        />
        <div style={{ marginTop: "20px" }}>
          <p className="text-[16px] leading-[20px] text-start mt-5 font-bold">
            {author}
          </p>
          <p className="font-small text-[#85858D] text-start mt-5">
            {" "}
            {publish_date} | tempmail@redberry.ge
          </p>
          <p className="text-2xl font-bold text-start my-5 ">{title}</p>
          <ul className="flex flex-wrap justify-center space-x-4 rounded">
            {categories.map((category) => (
              <li
                key={category.id}
                className="py-2 px-4 rounded-full m-2"
                style={{
                  backgroundColor: category.background_color,
                  color: category.text_color,
                  height: "40px", // Set a fixed height
                  display: "flex",
                  alignItems: "center", // Align text vertically in the middle
                }}
              >
                {category.title}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px" }} className="text-start">
            {description}
          </div>
        </div>
      </div>

      <SimilarComponents categoryId={categories} />
    </>
  );
};

export default BlogDetails;
