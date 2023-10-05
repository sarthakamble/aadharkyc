import React, { Component } from "react";
import './AadharAuthentication.css'
// import {
//   host,
//   generateotp,
//   verifyotp,
//   // ... other constants
// } from "../../constants/routes"; // Import the constants
import Axios from 'axios';
import { message } from 'antd';

class AadharAuthentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aadharNumber: "",
      mobileNumber: "",
      otp: "",
      ref_id: "", // Initialize ref_id
      isAuthenticated: false,
      isOTPVerified: false,
      name: "",
      dob: "",
      care_of: "",
      email: "", // Add email field here if needed
      gender: "", // Add gender field here if needed
      address: "", // Add address field here if needed
      split_address: {}, // Add split_address field here if needed
    };
    
  }

  handleAadharChange = (event) => {
    this.setState({ aadharNumber: event.target.value });
  };

  handleMobileChange = (event) => {
    this.setState({ mobileNumber: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleOTPChange = (event) => {
    this.setState({ otp: event.target.value });
  };

  authenticateAadhar = () => {
    const { aadharNumber } = this.state;
    // Prepare JSON data to send to the server with the correct variable name
    const jsonData = {
      aadhaar_number: aadharNumber, // Use the correct variable name
    };
    
    Axios.post('http://localhost:8080/generateotp', jsonData)
      .then(response => {
        // Handle the response from the server, e.g., check if authentication is successful
        if (response.data.message === 'OTP sent successfully') {
          // Generate and send OTP to the mobile number
          this.generateAndSendOTP();
          // Store the received ref_id in the component's state
          this.setState({ isAuthenticated: true, ref_id: response.data.ref_id });
          message.success('OTP sent successfully');
        }
      })
      .catch(error => {
        // Handle any errors and display an error message to the user
        console.error('Error:', error);
      });
  };
  

  verifyOTP = () => {
    const { otp, ref_id } = this.state; // Get OTP and ref_id from the component's state
  
    // Prepare JSON data for OTP and ref_id verification
    const verificationData = {
      otp: otp,
      ref_id: ref_id, // Use the stored ref_id
    };
  
    Axios.post('http://localhost:8080/verifyotp', verificationData)
      .then(response => {
        // Handle the response from the server, e.g., check if OTP and ref_id verification is successful
        if (response.data.isVerified) {
          // Both OTP and ref_id are verified, retrieve KYC details
          this.retrieveKYCDetails(response.data); // Pass the data to the retrieval function
          this.setState({ isOTPVerified: true });
        } else {
          // Handle verification failure
          console.error('OTP and ref_id verification failed');
        }
      })
      .catch(error => {
        // Handle any errors and display an error message to the user
        console.error('Error during verification:', error);
      });
  };
  
  

  retrieveKYCDetails = (data) => {
    // Assuming the server response includes fields "name", "dob", and "care_of"
    const { 
      name, 
      dob, 
      care_of,
      ref_id,
      status,
      message,
      address,
      email,
      gender,
      split_address,
   } = data;

    this.setState({
      name: name,
      dob: dob,
      care_of: care_of,
      ref_id,
    status,
    message,
    care_of,
    address,
    dob,
    email,
    gender,
    name,
    split_address,
    });
  };




  sendOTP = () => {
    // Simulate sending OTP via email (replace with actual email sending logic)
    // For simplicity, we'll assume OTP sending is always successful.
    alert(`OTP sent to ${this.state.email}`);
  };


  render() {
    return (
      <div className="container-aadhar">
        {!this.state.isAuthenticated && (
          <div className="aadhar">
            <h2>Aadhar Authentication</h2>
            <label>
              Aadhar Number:
              <input
                type="text"
                value={this.state.aadharNumber}
                onChange={this.handleAadharChange}
              />
            </label>
            <button onClick={this.authenticateAadhar}>Authenticate</button>
          </div>
        )}
        {this.state.isAuthenticated && !this.state.isOTPVerified && (
          <div className="kyc">
            <h2>OTP Verification</h2>
            {/* <label>
              Mobile Number:
              <input
                type="text"
                value={this.state.mobileNumber}
                onChange={this.handleMobileChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </label>
            <button onClick={this.sendOTP}>Send OTP</button>
            <br /> */}
            <label>
              OTP:
              <input
                type="text"
                value={this.state.otp}
                onChange={this.handleOTPChange}
              />
            </label>
            <button onClick={this.verifyOTP}>Verify OTP</button>
          </div>
        )}
        {this.state.isOTPVerified && (
          <div className="kyc-success">
            <h2>KYC Successful</h2>
            <p>Name: {this.state.name}</p>
            <p>Date of Birth: {this.state.dob}</p>
            <p>Relation: {this.state.care_of}</p>
            <p>Ref ID: {this.state.ref_id}</p>
            <p>Status: {this.state.status}</p>
            <p>Message: {this.state.message}</p>
            <p>Care Of: {this.state.care_of}</p>
            <p>Address: {this.state.address}</p>
            <p>Date of Birth: {this.state.dob}</p>
            <p>Email: {this.state.email}</p>
            <p>Gender: {this.state.gender}</p>
            <p>Name: {this.state.name}</p>
            {/* Add your KYC success message or redirection logic here */}
          </div>
        )}

      </div>
    );
  }
}

export default AadharAuthentication;
