import React from 'react';
import { useMyArrayContext } from '../contexts/MyArrayContext';
import { useQuery } from 'react-query';

const fetchData = async () => {
  try {
    const response = await fetch("https://api.blog.redberryinternship.ge/api/categories");

    if (!response.ok) {
      console.error("Error fetching categories:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};

const Navbar = () => {
  const { toggleElementInMyArray, myArray } = useMyArrayContext();
  const { data: categories, error, isLoading } = useQuery("categories", fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }
  return (
    <div className="max-w-screen-2xl">
      <nav className="flex items-center  max-w-fit m-20">
        <ul className="flex flex-wrap justify-center space-x-10 rounded  ">
          {categories.map((category) => (
            <button
              key={category.id}
              className="py-2 p-4 rounded-full m-2"
              style={{
                backgroundColor: category.background_color,
                color: category.text_color,
              }}
              onClick={() => {
                toggleElementInMyArray(category.id);
                console.log("MyArray:", myArray); // Log the updated myArray
              }}
            >
              {category.title}
            </button>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
