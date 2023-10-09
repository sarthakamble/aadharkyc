import React, { useState } from "react";
import './PANVerification.css';
import Axios from 'axios';
import { message } from 'antd';

export default function PANVerification() {

    const [isPANVerified, setIsPanVerified] = useState(false);
    const [pan, setPan] = useState("");
    const [res, setRes] = useState();

    function authenticatePAN() {
        const jsonData = {
            "pan": pan,
            "consent": "Y",
            "reason": "For KYC of User"
        }
        try {
            Axios.post('http://localhost:8080/verifypan', jsonData).then(
                response => {
                    console.log(response.data)
                    setIsPanVerified(true)
                    setRes(response.data)
                    message.success(response.data.message)
                }
            )
        } catch (error) {
            console.log(error)
        }
        setIsPanVerified(false);
        setPan("");
        setRes("");
    }

    return (
        <div className="container-pan">
            {!isPANVerified && (
                <div className="pan">
                    <h2>PAN Verification</h2>
                    <label>
                        PAN Number:
                        <input
                            type="text"
                            onChange={(event) => setPan(event.target.value)}
                            value={pan}
                        />
                    </label>
                    <button className="classicButton" onClick={authenticatePAN}>Verify</button>
                </div>
            )}
            {isPANVerified && (
                <div className="pan-success">
                    <h2>PAN Verification Successful</h2>
                    <p>Name: {res.full_name}</p>
                    <p>Code: {res.code}</p>
                    <p>Timestamp: {res.timestamp}</p>
                    <p>Transaction ID: {res.transaction_id}</p>
                    <p>Entity: {res.entity}</p>
                    <p>PAN: {res.pan}</p>
                    <p>Status: {res.status}</p>
                    <p>Category: {res.category}</p>
                    <p>Message: {res.message}</p>
                    Add other fields as needed
                </div>
            )}
        </div>
    );
}