import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/account/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5231/api/Account/login", {
        email,
        password,
      });
      setMessage("Login successful!");
      // Redirect to dashboard
      navigate("/hompage");
    } catch (error) {
      setMessage(error.response?.data || "An error occurred. Please try again.");
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
        <div className="extra-options">
          <p>
            Forgot your password?{" "}
            <span className="link" onClick={() => navigate("/forgot-password")}>
              Click here
            </span>
          </p>
          <p>
            Don't have an account?{" "}
            <span className="link" onClick={() => navigate("/sign-up")}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
