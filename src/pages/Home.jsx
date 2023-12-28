import React from "react";
import CustomCard from "../components/MyCard";
import Navbar from "../components/Navbars";
import Header from "../components/Header";
import { useQuery } from "react-query";
import { fetchData } from "../api/fetchData"; // Adjust the import statement

function Home() {
  // Fetch blogs using react-query
  const { data: blogs, error, isLoading } = useQuery(["blogs"], fetchData);

  // Get the current date
  const currentDate = new Date();

  // Filter blogs based on the publication date
  const filteredBlogs =
    blogs &&
    blogs.filter((blog) => new Date(blog.publish_date) >= currentDate);

  return (
    <>
      <Header />
      <Navbar />
      <main className="flex flex-wrap justify-center gap-8">
        {!isLoading && !error ? (
          <CustomCard
            isHomePageLookLike={true}
            blogs={filteredBlogs} // Pass filteredBlogs to CustomCard
          />
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>Error fetching blogs: {error.message}</div>
        )}
      </main>
    </>
  );
}

export default Home;
