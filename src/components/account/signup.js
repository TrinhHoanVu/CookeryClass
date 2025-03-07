import React, { useState } from "react";
import axios from "axios";
import "../../css/account/sign-up.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [name, setName] = useState("");
    const [paymentOption, setPaymentOption] = useState("monthly");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [amountPayment, setAmountPayment] = useState(10);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;

        if (!name.trim()) {
            errors.name = "Name cannot be empty.";
        }
        if (!emailRegex.test(email)) {
            errors.email = "Invalid email format.";
        }
        if (!passwordRegex.test(password)) {
            errors.password =
                "Password must be 8-16 characters and contain only letters and numbers.";
        }
        if (cfPassword !== password) {
            errors.cfPassword = "Passwords do not match.";
        }
        if (!paymentOption) {
            errors.paymentOption = "Please select a payment option.";
        }
        return errors;
    };

    const calculateAmountPayment = () => {
        return paymentOption === 'yearly' ? 100 : 10
    }

    const createPayment = async () => {
        setLoading(true);
        console.log(name + " " + calculateAmountPayment())
        try {
            const response = await axios.post("http://localhost:5231/api/SubscriptionPayment/create-payment", {
                Amount: calculateAmountPayment(),
                username: name
            });

            const approvalLink = response.data.approvalUrl;
            console.log("abc" + approvalLink)

            if (approvalLink) {
                window.location.href = approvalLink;
            }
        } catch (error) {
            console.error("Error creating PayPal payment", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        createPayment()
        // try {
        //     e.preventDefault();
        //     await axios.post("http://localhost:5231/api/Account/RegisterCode", { email }, {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         withCredentials: true,
        //     }).then(res => {
        //         if (res.status === 200)
        //             navigate("/confirmcode", {
        //                 state: {
        //                     linkNavigate: "/login",
        //                     name: name,
        //                     email: email,
        //                     password: password,
        //                     status: false
        //                 }
        //             })
        //     })

        // } catch (eror) {
        //     const errMes = eror.response?.data?.message
        //     console.log(errMes)
        //     setMessage(errMes)
        // }
        setErrors({});

    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Sign Up</h1>
                <p className="signup-subtitle">Welcome to JamesThew's Kitchen!</p>
                <div className="signup-form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="signup-error">{errors.name}</p>}
                </div>
                <div className="signup-form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="signup-error">{errors.email}</p>}
                </div>
                <div className="signup-form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="signup-error">{errors.password}</p>}
                </div>
                <div className="signup-form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={cfPassword}
                        onChange={(e) => setCfPassword(e.target.value)}
                    />
                    {errors.cfPassword && <p className="signup-error">{errors.cfPassword}</p>}
                </div>
                <div className="signup-form-group">
                    <label>Payment Options:</label>
                    <div className="signup-payment-options">
                        <label className="signup-payment-options-label">
                            <input
                                type="radio"
                                name="payment"
                                value="monthly"
                                checked={paymentOption === "monthly"}
                                onChange={(e) => setPaymentOption(e.target.value)}
                            />
                            <span style={{ marginTop: "7px" }}>Monthly ($10)</span>
                        </label>
                        <label className="signup-payment-options-label">
                            <input
                                type="radio"
                                name="payment"
                                value="yearly"
                                checked={paymentOption === "yearly"}
                                onChange={(e) => setPaymentOption(e.target.value)}
                            />
                            <span style={{ marginTop: "7px" }}>Yearly ($100)</span>
                        </label>
                    </div>
                    {errors.paymentOption && <p className="signup-error">{errors.paymentOption}</p>}
                </div>
                <button type="submit" className="signup-submit-button" onClick={handleSignUp}>
                    Sign Up
                </button>
                {message && <p className="signup-message">{message}</p>}
            </div>
        </div>
    );
};

export default SignUp;