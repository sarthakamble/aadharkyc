import React, { Component } from "react";
import './AadharAuthentication.css'

class AadharAuthentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aadharNumber: "",
      mobileNumber: "",
      email: "",
      otp: "",
      isAuthenticated: false,
      isOTPVerified: false,
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
  
    // Prepare JSON data to send to the server
    const jsonData = {
      aadharNumber: aadharNumber,
    };
    this.setState({ isAuthenticated: true });
  
    // fetch('https://example.com/api/authenticate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(jsonData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle the response from the server, e.g., check if authentication is successful
    //   if (data.isAuthenticated) {
    //     // Generate and send OTP to the mobile number
    //     this.generateAndSendOTP();
    //     this.setState({ isAuthenticated: true });
    //   }
    // })
    // .catch(error => {
    //   // Handle any errors
    //   console.error('Error:', error);
    // });
  };
  
  verifyOTP = () => {
    const { otp } = this.state;
  
    // Prepare JSON data to send to the server
    const jsonData = {
      otp: otp,
    };
    this.setState({ isOTPVerified: true });
  
    // fetch('https://example.com/api/verifyOTP', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(jsonData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle the response from the server, e.g., check if OTP verification is successful
    //   if (data.isOTPVerified) {
    //     // Retrieve KYC details from the server
    //     this.retrieveKYCDetails();
    //     this.setState({ isOTPVerified: true });
    //   }
    // })
    // .catch(error => {
    //   // Handle any errors
    //   console.error('Error:', error);
    // });
  };
  

  sendOTP = () => {
    // Simulate sending OTP via email (replace with actual email sending logic)
    // For simplicity, we'll assume OTP sending is always successful.
    alert(`OTP sent to ${this.state.email}`);
  };

  verifyOTP = () => {
    // Simulate OTP verification (replace with actual OTP verification logic)
    // For simplicity, we'll consider OTP verified if it's a non-empty string.
    if (this.state.otp.trim() !== "") {
      this.setState({ isOTPVerified: true });
    }
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
            <button onClick={this.sendOTP}>Send OTP</button>
            <br />
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
            {/* Add your KYC success message or redirection logic here */}
          </div>
        )}
      </div>
    );
  }
}

export default AadharAuthentication;
