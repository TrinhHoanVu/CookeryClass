import React, { useState } from "react";
import axios from "axios";
import "../../css/account/forgot-password.css";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5231/api/Account/RequestResetPassword",
                { email },
                {
                    headers: {
                        "Content-Type": "application/json", // Specify JSON content type
                    },
                    withCredentials: true,
                }
            );
            console.log("Sending email:", email);
            navigate("/confirmcode", { state: { linkNavigate: "/resetpassword" } })
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            setMessage(errorMessage);
        }
    };


    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h1>Forgot Password</h1>
                <form onSubmit={handleForgotPassword}>
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
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                    {/* Conditionally render the message */}
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
