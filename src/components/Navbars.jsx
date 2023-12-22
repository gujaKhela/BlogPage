import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://api.blog.redberryinternship.ge/api/categories"
        );
        const dataJson = await res.json();
        setCategories(dataJson.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="max-w-screen-2xl">
      <nav className="flex items-center  max-w-fit m-20">
        <ul className="flex flex-wrap justify-center space-x-10 rounded  ">
          {categories.map((category) => (
            <li
              key={category.id}
              className="py-2 p-4 rounded-full m-2"
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
