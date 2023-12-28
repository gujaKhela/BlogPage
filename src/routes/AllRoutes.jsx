import Home from "../pages/Home";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import AddBlog from "../pages/AddBlog";
import { Routes, Route } from "react-router-dom";

const AllRoutes = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        <Route path="/add_blog" element={<AddBlog />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
