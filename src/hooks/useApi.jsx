// // useApi.js

// import { useState, useEffect } from "react";

// const apiUrl = "https://api.blog.redberryinternship.ge/api";

// export const useToken = () => {
//   const [authToken, setAuthToken] = useState("");

//   const generateToken = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/token`, {
//         method: "GET",
//         headers: {
//           Authorization: "blog", 
//         },
//       });

//       const data = await response.json();
//       setAuthToken(data.token);
//       console.log("Token generated:", data.token);
//     } catch (error) {
//       console.error("Error generating token:", error);
//     }
//   };

//   return { authToken, generateToken };
// };

// export const useCategories = (authToken) => {
//   const [categories, setCategories] = useState([]);

//   const getCategories = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/categories`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       const categoriesData = await response.json();
//       setCategories(categoriesData);
//       console.log("Categories:", categoriesData);
//     } catch (error) {
//       console.error("Error retrieving categories:", error);
//     }
//   };

//   return { categories, getCategories };
// };
