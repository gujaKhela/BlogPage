import React, { useState, useEffect } from "react";

const BlogForm = () => {
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs when the component mounts
    fetchBlogs();
  }, []); // Empty dependency array to run the effect only once

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/blogs",
        {
          headers: {
            Authorization: `Bearer 88b0b15f33b1af2de3f0db42bfb56239f34b68634815ea6f7b77673968a00730`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Blogs:", data); // Add this line for logging
        setBlogs(data.data);
      } else {
        console.error(
          "Failed to fetch blogs. Response status:",
          response.status
        );
        setError("Failed to fetch blogs. Please try again.");
      }
    } catch (error) {
      console.error("Blog fetch error:", error);
      setError("Failed to fetch blogs. Please try again.");
    }
  };

  const handleAddBlog = async (blogData) => {
    try {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/blogs",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 06c849e6edaa8a40645ce20d6918e3815b03cffe83472ce974b896837bc18b1e`,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Log the entire response
      console.log("Full Response:", response);

      if (response.ok) {
        // If the blog is created successfully, fetch the updated list of blogs
        fetchBlogs();
      } else if (response.status === 204) {
        // Treat 204 as success, but no content
        fetchBlogs();
      } else {
        setError("Failed to create a blog. Please try again.");
      }
    } catch (error) {
      console.error("Blog creation error:", error);
      setError("Failed to create a blog. Please try again.");
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const blogData = {};
    formData.forEach((value, key) => {
      blogData[key] = value;
    });

    handleAddBlog(blogData);
  };

  return (
    <div>
      <p className="font-bold	text-2xl"> ბლოგის დამატება </p>
      <div className="mx-auto max-w-4xl mt-8">
        <form onSubmit={handleCreateBlog}>
          {/* Image Uploader */}
          <div className="mb-8">
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Upload Image (PNG)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png"
              className="mt-2"
            />
          </div>

          {/* Author and Name Side by Side */}
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                autoComplete="author"
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <label
              htmlFor="blog-description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Blog Description
            </label>
            <textarea
              id="blog-description"
              name="blog-description"
              rows="3"
              className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>

          {/* Date and Category Side by Side */}
          <div className="grid grid-cols-2 gap-x-6 mt-8">
            <div>
              <label
                htmlFor="publish-date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Publish Date
              </label>
              <input
                type="date"
                id="publish-date"
                name="publish-date"
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                autoComplete="category"
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Mail */}
          <div className="mt-8">
            <label
              htmlFor="mail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mail
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              autoComplete="email"
              className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Your Blog Posts</h2>
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <p className="font-semibold text-lg">{blog.title}</p>
                <p className="text-gray-600">Author: {blog.author}</p>
                <p className="text-gray-600">
                  Publish Date: {blog.publish_date}
                </p>
                <p className="text-gray-600">
                  Category:{" "}
                  {blog.categories.map((category) => category.name).join(", ")}
                </p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default BlogForm;
