import Home from "../pages/Home";
import Blog from "../pages/Blog";
import AddBlog from "../pages/AddBlog";
import { Routes, Route } from "react-router-dom";

const AllRoutes = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/add_blog" element={<AddBlog />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
