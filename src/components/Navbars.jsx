import React from "react";
import { useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch("https://api.blog.redberryinternship.ge/api/categories");
  const dataJson = await res.json();
  return dataJson.data;
};

const Navbar = () => {
  const { data: categories, error, isLoading } = useQuery("categories", fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  return (
    <div className="max-w-screen-2xl">
      <nav className="flex items-center justify-center max-w-fit m-20">
        <ul className="flex flex-wrap space-x-10">
          {categories.map((category) => (
            <li
              key={category.id}
              className="py-2 px-4 rounded-full m-2"
              style={{
                backgroundColor: category.background_color,
                color: category.text_color,
              }}
            >
              {category.title}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
