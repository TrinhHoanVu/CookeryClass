import React, { useState } from "react";
import axios from "axios";
import "../../css/account/sign-up.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("")
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5231/api/Account", {
                email,
                password,
                name,
            });
            setMessage("Sign up successful! You can now log in.");
        } catch (error) {
            setMessage(
                error.response?.data || "An error occurred. Please try again."
            );
        }
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-box">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={cfPassword}
                            onChange={(e) => setCfPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Sign Up
                    </button>
                    <p className="message">{message}</p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
