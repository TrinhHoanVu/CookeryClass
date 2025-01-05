import React, { useState } from "react";
import axios from "axios";
import "../../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Email and password cannot be empty.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5231/api/Account/login", {
        email,
        password,
      });

      if (response.data) {
        setMessage("Login successful!");
        // Redirect to a new page (e.g., dashboard)
        // window.location.href = "/dashboard"; // Or use React Router
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      setMessage(
        error.response?.data || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">🍳 Cooking Login</h1>
        <p className="subtitle">Welcome to JamesThew's Kitchen!</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="message">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
