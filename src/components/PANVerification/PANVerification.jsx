import React, { useState } from "react";
import './PANVerification.css';
import Axios from 'axios';
import { message } from 'antd';


export default function PANVerification() {

    const [isPANVerified, setIsPanVerified] = useState(false);
    const [pan, setPan] = useState("");
    const [res, setRes] = useState();


    function authenticatePAN() {
        if (pan === 'XXXPX1234A' || pan === 'XXXCX1234B') {
            const jsonData = {
                "pan": pan,
                "consent": "Y",
                "reason": "For KYC of User"
            };

            Axios.post('http://localhost:8080/verifypan', jsonData)
                .then(response => {
                    console.log(response.data);
                    setIsPanVerified(true);
                    setRes(response.data);
                    message.success(response.data.message);
                })
                .catch(error => {
                    console.log(error);
                    message.error("Failed to authenticate PAN");
                });
        } else if (pan === 'XXXHX1234J') {
            message.error("Invalid PAN");
        } else if (pan === 'XXXPX1234C' || pan === 'XXXPX1234D') {
            message.error("Insufficient Privilege");
        } else if (pan === 'XXXPX123EE') {
            message.error("Invalid PAN Pattern");
        } else if (pan === 'XXXPX1234H') {
            message.error("Consent Required");
        } else if (pan === 'XXXPX1234F') {
            message.error("Internal Server Error");
        } else if (pan === 'XXXPX1234G') {
            message.error("Source Unavailable");
        } else {
            message.error("Invalid PAN number provided");
        }

        // Resetting the state for every case other than success
        setIsPanVerified(false);
        setPan("");
        setRes(null);
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
                </div>
            )}
        </div>
    );

}