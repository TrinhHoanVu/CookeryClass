import axios from "axios";
import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DatabaseContext";
import { jwtDecode } from "jwt-decode";


function AccountDetail() {
    const { tokenInfor } = useContext(DataContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAdress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    async function handleUpdateProfile(e) {
        e.preventDefault();
        await axios.post("http://localhost:5231/api/Account/updateProfile", { name, password, address, phoneNumber })
            .then(res => {
                if (res.status === 200) {

                }
            })
            .catch(err => console.log(err))

    }
    return (
        <div className="profile-container">
            <div className="profile-box">
                <h1 className="title">Account Profile</h1>
                <p className="subtitle">Manage your account information</p>
                <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            readOnly
                            value={tokenInfor.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={tokenInfor?.unique_name}
                            onChange={setName}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={tokenInfor?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/streetaddress"]}
                            onChange={setAdress}
                            placeholder="Enter your address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={tokenInfor?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"]}
                            onChange={setPhoneNumber}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="form-group">
                        
                        <label htmlFor="expiredDay">Expired Day</label>
                        <input
                            type="text"
                            readOnly
                            id="expiredDay"
                            name="expiredDay"
                            value={tokenInfor?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/expired"]}
                        />
                    </div>
                    <button type="submit" className="profile-button">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AccountDetail