import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center w-1/2 mx-auto  m-20">
      <ul className="flex space-x-10 rounded ">
        <li className="py-2 px-4 bg-blue-500 bg-opacity-30 rounded">Item 1</li>
        <li className="py-2 px-4 bg-blue-500 bg-opacity-30 rounded">Item 2</li>
        <li className="py-2 px-4 bg-blue-500 bg-opacity-30 rounded">Item 3</li>
        <li className="py-2 px-4 bg-blue-500 bg-opacity-30 rounded">Item 4</li>
        <li className="py-2 px-4 bg-blue-500 bg-opacity-30 rounded">Item 5</li>
      </ul>
    </nav>
  );
};

export default Navbar;
