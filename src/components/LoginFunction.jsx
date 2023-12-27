import React, { useState } from "react";

const LoginFunction = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      // Log the response status
      console.log("Response Status:", response.status);

      // Check if the login was successful (status 204)
      if (response.status === 204) {
        console.log("Login successful with status 204");
      } else {
        // Log the JSON response data if there is content
        if (response.body) {
          const data = await response.json();
          console.log("Response Data:", data);
        }
      }
    } catch (error) {
      // Log the error to the console
      console.error("Login error:", error);
      setError("Invalid email. Please try again.");
    }
  };

}
export default LoginFunction;
