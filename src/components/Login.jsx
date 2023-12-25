import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  //   const handleLogin = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch("https://api.blog.redberryinternship.ge/api/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer 06c849e6edaa8a40645ce20d6918e3815b03cffe83472ce974b896837bc18b1e`
  //         },
  //         body: JSON.stringify({ email }),
  //       });

  //       // Check if the response status is 204 (No Content)
  //       if (response.status === 204) {
  //         // No need to parse the response if there is no content
  //         // You can handle the success case here if needed
  //         console.log("Login successful with status 204");
  //       } else {
  //         // Parse the JSON response for other status codes
  //         const data = await response.json();
  //         // Assuming the backend returns a token upon successful login
  //         const token = data.token;

  //         // Store the token securely (e.g., in localStorage or sessionStorage)
  //         localStorage.setItem("token", token);

  //         // Set the token in the context provider
  //         setBearerToken(token);

  //         // Redirect the user or perform any other necessary actions
  //       }
  //     } catch (error) {
  //       // Log the error to the console
  //       console.error("Login error:", error);
  //       setError("Invalid email. Please try again.");
  //     }
  //   };

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
        // No need to parse the response if there is no content
        // You can handle the success case here if needed
        // Redirect the user or perform any other necessary actions
        console.log("Login successful with status 204");
      } else {
        // Log the JSON response data if there is content
        if (response.body) {
          const data = await response.json();
          console.log("Response Data:", data);

          // Assuming the backend returns a token upon successful login
          const token = data.token;

          // Store the token securely (e.g., in an HTTP-only cookie or secure local storage)
          // For example, using localStorage (note: consider more secure options)
          localStorage.setItem("token", token);

          // Set the token in the context provider
          setBearerToken(token);

          // Redirect the user or perform any other necessary actions
        }
      }
    } catch (error) {
      // Log the error to the console
      console.error("Login error:", error);
      setError("Invalid email. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
