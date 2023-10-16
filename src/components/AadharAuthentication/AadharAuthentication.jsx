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
import PANVerification from "../PANVerification/PANVerification";

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
      year_of_birth: "",
      mobile_hash: "",
      photo_link: "",
      showPANVerification: false,
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
    //this.setState({ isAuthenticated: true });
    // Prepare JSON data to send to the server with the correct variable name
    const jsonData = {
      aadhaar_number: aadharNumber, // Use the correct variable name
    };



    Axios.post('http://localhost:8080/generateotp', jsonData)
      .then(response => {
        // Handle the response from the server, e.g., check if authentication is successful
        if (response.data.message === 'OTP sent successfully') {
          this.setState({ isAuthenticated: true, ref_id: response.data.ref_id });
          message.success('OTP sent successfully');
        } else {
          message.error(response.data.message);
          this.setState({ aadharNumber: '', isAuthenticated: false });  // Reset Aadhar number and set isAuthenticated to false
        }
      })
      .catch(error => {
        // Handle any errors and display an error message to the user
        message.error('Error:', error.message);
        console.error('Error:', error);
      });
  };


  verifyOTP = () => {
    const { otp, ref_id } = this.state;
    //this.setState({ isOTPVerified: true });
    // Prepare JSON data for OTP and ref_id verification
    const verificationData = {
      otp: otp,
      ref_id: ref_id,
    };

    Axios.post('http://localhost:8080/verifyotp', verificationData)
      .then(response => {
        if (response.data && response.data.code) {
          // Define the expected case
          const expectedCase = {
            ref_id: '1234567',
            otp: '121212',
            code: 200,
            message: 'Success OK',
          };

          // Check if the response matches the expected case
          if (
            expectedCase.ref_id === ref_id &&
            expectedCase.otp === otp &&
            expectedCase.code === response.data.code
          ) {
            // Handle the response based on the matched case
            message.success(expectedCase.message);
            this.retrieveKYCDetails(response.data.data); // Pass the data to the retrieval function
            this.setState({ isOTPVerified: true });
          } else {
            // Handle the case where there is no match (all other cases)
            this.setState({ isOTPVerified: false });
            message.error(response.data.message);
          }
        } else {
          // Handle the case where response.data or response.data.code is missing
          this.setState({ isOTPVerified: false });
          message.error('Invalid response format');
        }
      })
      .catch(error => {
        // Handle any errors and display an error message to the user
        console.error('Error during verification:', error);
      });
  };



  // Function to show PAN verification section
  showPANVerification = () => {
    this.setState({ showPANVerification: true });
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
      year_of_birth,
      mobile_hash,
      photo_link,
    } = data;

    const {
      country,
      dist,
      house,
      landmark,
      pincode,
      po,
      state,
      street,
      subdist,
      vtc,
    } = split_address;

    this.setState({
      name: name,
      dob: dob,
      care_of: care_of,
      address: address,
      email: email,
      gender: gender,
      ref_id: ref_id,
      status: status,
      message: message,
      country: country,
      dist: dist,
      house: house,
      landmark: landmark,
      pincode: pincode,
      po: po,
      state: state,
      street: street,
      subdist: subdist,
      vtc: vtc,
      isOTPVerified: true,
      year_of_birth: year_of_birth,
      mobile_hash: mobile_hash,
      photo_link: photo_link,

    });
  };

  renderKYCSuccess = () => {
    return (
      <div className="kyc-success">
        <div className="kyc-head">
          <h2>KYC Successful</h2>
        </div>
        <div className="kyc-row">
          <div className="row">
            <label>Name:</label>
            <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
          </div>
          <div className="row">
            <label>Date of Birth:</label>
            <input type="text" value={this.state.dob} onChange={(e) => this.setState({ dob: e.target.value })}/>
          </div>
          <div className="row">
            <label>Relation:</label>
            <input type="text" value={this.state.care_of} onChange={(e) => this.setState({ care_of: e.target.value })}/>
          </div>
          <div className="row">
            <label>Ref ID:</label>
            <input type="text" value={this.state.ref_id} onChange={(e) => this.setState({ ref_id: e.target.value })}/>
          </div>
          <div className="row">
            <label>Status:</label>
            <input type="text" value={this.state.status} onChange={(e) => this.setState({ status: e.target.value })}/>
          </div>
          <div className="row">
            <label>Message:</label>
            <input type="text" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })}/>
          </div>
          <div className="row">
            <label>Address:</label>
            <input type="text" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })}/>
          </div>
          <div className="row">
            <label>Email:</label>
            <input type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>
          </div>
          <div className="row">
            <label>Gender:</label>
            <input type="text" value={this.state.gender} onChange={(e) => this.setState({ gender: e.target.value })}/>
          </div>
          <div className="row">
            <label>Year of Birth:</label>
            <input type="text" value={this.state.year_of_birth} onChange={(e) => this.setState({ year_of_birth: e.target.value })}/>
          </div>
          <div className="row">
            <label>Mobile Hash:</label>
            <input type="text" value={this.state.mobile_hash} onChange={(e) => this.setState({ mobile_hash: e.target.value })}/>
          </div>
          <div className="row">
            <label>Photo Link:</label>
            <input type="text" value={this.state.photo_link} onChange={(e) => this.setState({ photo_link: e.target.value })}/>
          </div>
        </div>
        <div className="save-btn">
          <button className="saveButton" onClick={this.showPANVerification}>Save</button>
          </div>
      </div>

    );
  };


  render() {
    return (
      <div className="container-aadhar">
        {!this.state.isAuthenticated && (
          <div className="aadhar">
            <h2>Aadhaar Authentication</h2>
            <label>
              Aadhaar Number:
              <input
                type="text"
                value={this.state.aadharNumber}
                onChange={this.handleAadharChange}
              />
            </label>
            <label>
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
            <button className="classicButton" onClick={this.authenticateAadhar}>Authenticate</button>
          </div>

        )}
        {this.state.isAuthenticated && !this.state.isOTPVerified && (
          <div className="kyc">
            <h2>OTP Verification</h2>
            <label>
              OTP:
              <input
                type="text"
                value={this.state.otp}
                onChange={this.handleOTPChange}
              />
            </label>
            <button className="classicButton" onClick={this.verifyOTP}>Verify OTP</button>
          </div>
        )}
        {this.state.isOTPVerified && !this.state.showPANVerification && (
          this.renderKYCSuccess()
        )}
        {/* {this.state.isOTPVerified && (
          <div className="kyc-success">
            <h2>KYC Successful</h2>
            <p>Name: {this.state.name}</p>
            <p>Date of Birth: {this.state.dob}</p>
            <p>Relation: {this.state.care_of}</p>
            <p>Ref ID: {this.state.ref_id}</p>
            <p>Status: {this.state.status}</p>
            <p>Message: {this.state.message}</p>
            <p>Address: {this.state.address}</p>
            <p>Email: {this.state.email}</p>
            <p>Gender: {this.state.gender}</p>
            <p>Year of Birth: {this.state.year_of_birth}</p>
            <p>Mobile Hash: {this.state.mobile_hash}</p>
            <p>Photo Link: {this.state.photo_link}</p>
            
            <button onClick={this.showPANVerification}>Next</button>
          </div>
        )} */}
        {/* Conditionally render PAN verification section */}
        {this.state.showPANVerification && <PANVerification />}
      </div>
    );
  }
}

export default AadharAuthentication;
