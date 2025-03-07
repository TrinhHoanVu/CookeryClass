import React, { useEffect } from "react";
import "../../css/account/payment-success.css";
import axios from "axios";


const PaymentSuccess = () => {
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const orderId = queryParams.get("token");

        const capturePayment = async (orderId) => {
            try {
                const response = await axios.post("http://localhost:5231/api/SubscriptionPayment/capture-payment", {
                    orderId,
                });
                console.log("Payment captured successfully:", response);
            } catch (error) {
                console.log("Error payment: ", error);
            }
        };

        if (orderId) {
            capturePayment(orderId);
        }
    }, []);
    const handleRedirect = () => {
        window.location.href = "/";
    };

    return (
        <div className="payment-success-container">
            <div className="payment-success-box">
                <h1>Payment Successful!</h1>
                <p>
                    Thank you for your payment. Your subscription is now active, and
                    you can enjoy all the benefits of our service.
                </p>
                <button onClick={handleRedirect} className="success-button">
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
