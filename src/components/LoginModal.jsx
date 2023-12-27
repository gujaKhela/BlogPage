import React, { useState } from "react";
import LoginFunction from "./LoginFunction";
import { useAuth } from "../contexts/AuthContext";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Access the login function from the context

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
        login(); // Update the login state in the context
        onClose();
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

  return (
    <div className={`modal-overlay ${isOpen ? "open" : "closed"}`}>
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginModal;
