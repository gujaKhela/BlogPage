import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.blog.redberryinternship.ge/api";
const TOKEN =
  "Bearer 9ef0d6b55a8c8bf314146b2601b506eca81d51fc1109983ae787af7af1e35c23";

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
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // for validation
  const [isAuthorValid, setIsAuthorValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const [forceUpdate, setForceUpdate] = useState(false);

  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [formData, setFormData] = useState(() => {
    // Retrieve data from local storage or use initialFormData
    const storedFormData = localStorage.getItem("blogFormData");
    return storedFormData ? JSON.parse(storedFormData) : initialFormData;
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`, {
          headers: {
            Authorization: TOKEN,
          },
        });

        if (!response.data || !Array.isArray(response.data.data)) {
          console.error(
            "Invalid response format for categories:",
            response.data
          );
          return;
        }

        setAllCategories(response.data.data);
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
    // Save form data to local storage whenever formData changes
    localStorage.setItem("blogFormData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "author") {
      const isValidAuthor =
        /^[\u10D0-\u10F1\s]+$/u.test(value) && // Check for Georgian characters and spaces
        value.trim().split(/\s+/).length >= 2 && // Check for at least 2 words
        value.trim().length >= 4; // Check for at least 4 characters

      setIsAuthorValid(isValidAuthor);
    } else if (name === "email") {
      const isValidEmail = /^[a-zA-Z0-9._-]+@redberry\.ge$/.test(value);
      setIsEmailValid(isValidEmail);
    } else if (name === "title") {
      const isValidTitle = value.length >= 2;
      setIsTitleValid(isValidTitle);
    } else if (name === "description") {
      const isValidDescription = value.length >= 2;
      setIsDescriptionValid(isValidDescription);
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setForceUpdate(!forceUpdate);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Set the file in the form data
    setFormData((prevData) => ({ ...prevData, image: file }));

    // Remove the file data before storing in local storage
    const { image, ...formDataWithoutImage } = formData;

    // Save the form data to local storage
    localStorage.setItem("blogFormData", JSON.stringify(formDataWithoutImage));
  };

  const validateForm = () => {
    const errors = {};

    // Validation rules for Author
    if (formData.author.trim().length < 4) {
      errors.author = [
        "მინიმუმ 4 სიმბოლო",
        "მინიმუმ ორი სიტყვა",
        "მხოლოდ ქართული სიმბოლოები",
      ];
    }

    // Validation rules for Email
    if (formData.email.trim() !== "") {
      const isValidEmail = /^[a-zA-Z0-9._-]+@redberry\.ge$/.test(
        formData.email
      );
      if (!isValidEmail) {
        errors.email = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
      }
    }

    // Validation rules for Title
    if (formData.title.trim().length < 2) {
      errors.title = "მინიმუმ 2 სიმბოლო";
    }

    // Validation rules for Description
    if (formData.description.trim().length < 2) {
      errors.description = "მინიმუმ 2 სიმბოლო";
    }

    // Update real-time validation states
    setIsAuthorValid(!errors.author);
    setIsEmailValid(!errors.email);
    setIsTitleValid(!errors.title);
    setIsDescriptionValid(!errors.description);

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );

    const newSelectedCategories = selectedOptions.filter(
      (categoryId) => !formData.selectedCategories.includes(Number(categoryId))
    );

    setFormData((prevData) => ({
      ...prevData,
      selectedCategories: [
        ...prevData.selectedCategories,
        ...newSelectedCategories.map(Number),
      ],
    }));
    setCategoryDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Always send the request to the backend
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    formDataToSend.append(
      "categories",
      JSON.stringify(formData.selectedCategories)
    );

    console.log("FormData before sending:", formData);

    try {
      const response = await axios.post(`${API_URL}/blogs`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: TOKEN,
        },
      });

      console.log("API Response:", response.data);

      // Clear validation errors
      setValidationErrors({});

      // Handle successful response or perform any other actions
    } catch (error) {
      console.error("Error:", error);

      // Check if the error is due to validation errors
      if (error.response && error.response.data && error.response.data.errors) {
        // Display the validation errors
        setValidationErrors(error.response.data.errors);

        // Update the UI to show validation errors (red outline)
        // You can set a specific class or style for invalid fields
        // For example, set a 'has-error' class on the input fields
        // The actual class name might depend on your styling framework
        setIsAuthorValid(false); // Example for the 'author' field
        setIsEmailValid(false); // Example for the 'email' field
        setIsTitleValid(false); // Example for the 'title' field
        setIsDescriptionValid(false); // Example for the 'description' field
      }
    }
  };

  return (
    <div className="w-full justify-center flex">
      <div className="w-[720px] flex flex-col gap-4 ">
        <p className="font-bold text-[30px] leading-[45px] mt-20">
          {" "}
          ბლოგის დამატება{" "}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <p className="font-medium leading-[20px]">ატვირთეთ ფოტო</p>

          <div className="relative cursor-pointer w-full bg-[#F4F3FF] border-[2px] border-dashed border-[#85858D] rounded-xl justify-center flex flex-col items-center gap-6 h-[180px]">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0"
            />
            <div className="flex flex-col items-center w-full">
              <img src="" alt="Preview" />
              <div className="flex gap-1">
                <p>ჩააგდეთ ფაილი აქ ან </p>
                <p className="font-medium underline"> აირჩიეთ ფაილი</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8 flex-col md:flex-row">
            <div className="flex flex-col gap-3 w-full ">
              <label className="">ავტორი *</label>
              <div className="w-full relative">
                <input
                  type="text"
                  name="author"
                  placeholder={"შეიყვნეთ ავტორი"}
                  value={formData.author}
                  onChange={handleInputChange}
                  className={`w-full border-2 rounded-md ${
                    !isAuthorValid ? "border-red-500" : ""
                  }`}
                />
              </div>

              <ul
                key={JSON.stringify(validationErrors)}
                className="font-small text-[13px] list-disc list-inside md:text-15px"
              >
                <li
                  className={`text-${
                    isAuthorValid &&
                    formData.author.trim().split(/\s+/).length >= 2
                      ? "green-500"
                      : "red-500"
                  }`}
                >
                  {formData.author.trim().split(/\s+/).length >= 2
                    ? "At least 2 words"
                    : "Minimum 2 words required"}
                </li>
                <li
                  className={`text-${
                    isAuthorValid && formData.author.trim().length >= 4
                      ? "green-500"
                      : "red-500"
                  }`}
                >
                  {formData.author.trim().length >= 4
                    ? "At least 4 characters"
                    : "Minimum 4 characters required"}
                </li>
                <li
                  className={`text-${
                    isAuthorValid &&
                    /^[\u10D0-\u10F1\s]+$/u.test(formData.author)
                      ? "green-500"
                      : "red-500"
                  }`}
                >
                  {/^[\u10D0-\u10F1\s]+$/u.test(formData.author)
                    ? "Only Georgian characters"
                    : "Must contain only Georgian characters"}
                </li>
              </ul>
            </div>

            <div>
              <label>სათური *</label>
              <input
                type="text"
                name="title"
                placeholder="შეიყვნეთ სათაური"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full border-2 rounded-md ${
                  !isTitleValid ? "border-red-500" : ""
                }`}
              />
              <p className={`text-${isTitleValid ? "green-500" : "red-500"}`}>
                მინიმუმ 2 სიმბოლო
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="flex gap-8 flex-col md:flex-row">
            <div className="flex flex-col gap-3 w-full ">
              <label>
                აღწერა *
                <textarea
                  type="text"
                  name="description"
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    !isDescriptionValid ? "border-red-500" : ""
                  }`}
                ></textarea>
                <p
                  className={`text-${
                    isDescriptionValid ? "green-500" : "red-500"
                  }`}
                >
                  მინიმუმ 2 სიმბოლო
                </p>
              </label>
            </div>
          </div>

          {/* Date and Categories */}
          <div className="flex-col flex gap-8 items-center md:flex-row">
            <div>
              <label>
                გამოქვეყნების თარიღი *
                <input
                  className={`mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  type="date"
                  name="publish_date"
                  value={formData.publish_date}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 w-full pb-3">
              <p className={`font-bold text-[14px] text-[#1A1A1F] `}>
                კატეგორია *
              </p>
              <div className="relative">
                <div
                  className="mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
                  onClick={() =>
                    setCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                >
                  {isCategoryDropdownOpen && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      ></svg>
                    </div>
                  )}
                  {formData.selectedCategories.length > 0
                    ? formData.selectedCategories.map((categoryId) => {
                        const selectedCategory = allCategories.find(
                          (category) => category.id === categoryId
                        );

                        return (
                          <span
                            key={categoryId}
                            className="mr-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                            style={{
                              backgroundColor:
                                selectedCategory?.background_color,
                              color: selectedCategory?.text_color,
                            }}
                          >
                            {selectedCategory ? selectedCategory.title : ""}
                          </span>
                        );
                      })
                    : "აირჩიეთ კატეგორია"}
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

          {/* Email */}
          <div className="w-full md:pr-4 md:w-1/2">
            <label>
              ელ-ფოსტა *
              <input
                className={`mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  !isEmailValid ? "border-red-500" : ""
                }`}
                type="text"
                name="email"
                placeholder="Example@redberry.ge"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <p
              className={`text-sm text-${
                isEmailValid ? "green-500" : "red-500"
              }`}
            >
              უნდა მთავრდებოდეს @redberry.ge-თ
            </p>
          </div>

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className={`bg-purple-500 rounded-md text-white px-3 md:px-10 py-3`}
            >
              გამოქვეყნება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
