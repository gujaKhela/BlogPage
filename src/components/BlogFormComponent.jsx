import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogForm = () => {
  const initialFormData = {
    title: "",
    description: "",
    image: null,
    author: "",
    publish_date: "",
    selectedCategories: [],
    email: "",
  };

  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // Store all categories separately
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.blog.redberryinternship.ge/api/categories"
        );

        if (!response.data || !Array.isArray(response.data.data)) {
          console.error(
            "Invalid response format for categories:",
            response.data
          );
          return;
        }

        setAllCategories(response.data.data); // Save all categories
        console.log("Categories from API:", response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const storedFormData = localStorage.getItem("blogFormData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blogFormData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const validateForm = () => {
    const errors = {};
    // Validation rules (add your own rules)
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );

    // Filter out categories that are already selected
    const newSelectedCategories = selectedOptions.filter(
      (categoryId) => !formData.selectedCategories.includes(Number(categoryId))
    );

    // Update selected categories in form data
    setFormData((prevData) => ({
      ...prevData,
      selectedCategories: [
        ...prevData.selectedCategories,
        ...newSelectedCategories.map(Number),
      ],
    }));

    // Log selected categories for debugging
    console.log("Selected Categories:", formData.selectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();

      // Append other form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append selectedCategories explicitly with the expected field name
      formDataToSend.append(
        "categories",
        JSON.stringify(formData.selectedCategories)
      );

      // Log formData just before sending to the API
      console.log("FormData before sending:", formData);

      try {
        const response = await axios.post(
          "https://api.blog.redberryinternship.ge/api/blogs",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer 9bf9e1d01445670513eb7efd8efd8a54ec810ae9a16c1dc96929f885aeeff00e",
            },
          }
        );

        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Form validation failed. Please check the errors.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl mt-8">
      <p className="font-bold text-2xl"> ბლოგის დამატება </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label>
            Image:
            <input type="file" name="image" onChange={handleImageChange} />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </label>
          </div>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </label>
          </div>
        </div>

        {/* //aqedan kide  */}
        <div className="mt-8">
          <label>
            Description:
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </label>
        </div>

        {/* es xvaa */}

        <div className="grid grid-cols-2 gap-x-6 mt-8">
          <div>
            <label>
              Publish Date:
              <input
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="date"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            Categories:
            <div className="relative">
              <div
                className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
              >
                {isCategoryDropdownOpen && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      {/* ... (existing code) */}
                    </svg>
                  </div>
                )}
                {formData.selectedCategories.length > 0
                  ? formData.selectedCategories.map((categoryId) => (
                      <span
                        key={categoryId} // Make sure categoryId is unique
                        className="mr-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                      >
                        {categoryId}
                      </span>
                    ))
                  : "Select Categories"}
              </div>
              {isCategoryDropdownOpen && (
                <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                  <select
                    className="w-full p-2"
                    name="selectedCategories"
                    value={formData.selectedCategories}
                    onChange={handleCategoryChange}
                    multiple
                  >
                    {allCategories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        style={{
                          backgroundColor: category.background_color,
                          color: category.text_color,
                        }}
                      >
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="mt-8">
          <label>
            Email:
            <input
              className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <br />
        <div className="mt-8">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
