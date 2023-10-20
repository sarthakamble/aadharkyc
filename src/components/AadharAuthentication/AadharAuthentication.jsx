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
// import PANVerification from "../PANVerification/PANVerification";
import TabBar from '../TabBar/TabBar'; // Import the TabBar component

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
      activeTab: 'aadhar', // Set the initial active tab
      isAadharDisabled: false,
      isKycDisabled: false,
      isSuccessDisabled: false,
      isAadharCompleted: false,
      isKYCCompleted: false,
      isSuccessCompleted: false,
      isPANVerified: false, // Initialize isPANVerified
      pan: "", // Initialize pan
      res: null, // Initialize res
      storedEmail: "", // Initialize a separate variable for storing email
      panInput: "",
    };

  }

  handleAadharChange = (event) => {
    const inputAadhar = event.target.value;
    // Remove all non-digits and spaces
    const formattedAadhar = inputAadhar.replace(/[^\d]/g, '');
  
    if (formattedAadhar.length <= 12) {
      // Add a space after every 4 digits for display
      let formattedValue = '';
      for (let i = 0; i < formattedAadhar.length; i += 4) {
        formattedValue += formattedAadhar.slice(i, i + 4);
        if (i + 4 < formattedAadhar.length) {
          formattedValue += ' ';
        }
      }
  
      this.setState({ aadharNumber: formattedValue });
  
      // Set the actual value without spaces in a separate state variable
      const aadharWithoutSpaces = formattedAadhar;
      this.setState({ aadharNumberWithoutSpaces: aadharWithoutSpaces });
    }
  };

  handleMobileChange = (event) => {
    this.setState({ mobileNumber: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ storedEmail: event.target.value });
  };

  handleOTPChange = (event) => {
    this.setState({ otp: event.target.value });
  };

  authenticateAadhar = () => {
    const { aadharNumberWithoutSpaces } = this.state;
    // this.setState({ isAuthenticated: true });
    // this.setState({ isAadharCompleted: true });
    // this.setState({ activeTab: 'kyc' });
    // Prepare JSON data to send to the server with the correct variable name
    const jsonData = {
      aadhaar_number: aadharNumberWithoutSpaces, // Use the correct variable name
    };
    Axios.post('http://localhost:8080/generateotp', jsonData)
      .then(response => {
        // Handle the response from the server, e.g., check if authentication is successful
        if (response.data.message === 'OTP sent successfully') {
          this.setState({ isAuthenticated: true, ref_id: response.data.ref_id });
          message.success('OTP sent successfully');
          this.setState({ activeTab: 'kyc' });
          this.setState({ isAadharCompleted: true });
        } else {
          message.error(response.data.message);
          this.setState({ aadharNumber: '', isAuthenticated: false });  // Reset Aadhar number and set isAuthenticated to false
        }
      })
      .catch(error => {
        // Handle any errors and display an error message to the user
        message.error(error.message);
        console.error(error);
      });
  };


  verifyOTP = () => {
    const { otp, ref_id, storedEmail } = this.state;
    // this.setState({ isOTPVerified: true });
    // this.setState({ isKYCCompleted: true });
    // this.setState({ isSuccessCompleted: true });
    // this.setState({ activeTab: 'success' });
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
            this.setState({ activeTab: 'success' });
            // Handle the response based on the matched case
            message.success(expectedCase.message);
            // console.log('Response Data:', response.data);
            this.retrieveKYCDetails(response.data.data); // Pass the data to the retrieval function
            this.setState({ isOTPVerified: true });
            this.setState({ isKYCCompleted: true });
            this.setState({ isSuccessCompleted: true });
            this.setState({ email: storedEmail }); // Update email with the stored value
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

  // PAN Verification
  authenticatePAN = () => {
    const pan = this.state.panInput;
    const res = this.state.res;
    //this.setState({ isPANVerified: true });

    if (pan === 'XXXPX1234A' || pan === 'XXXCX1234B') {
      const jsonData = {
        pan: pan,
        consent: "Y",
        reason: "For KYC of User"
      };

      Axios.post('http://localhost:8080/verifypan', jsonData)
        .then(response => {
          console.log(response.data);
          this.setState({ isPANVerified: true, res: response.data });
          message.success("PAN Verification Successful. Please click Submit button");
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
    this.setState({ isPANVerified: false, pan: "", res: null });
  };

  // setRes = (newRes) => {
  //   this.setState({ res: newRes });
  // }
  handlePANChange = (event) => {
    this.setState({ panInput: event.target.value });
  };

  // Function to show PAN verification section
  showPANVerification = () => {
    this.setState({ showPANVerification: true });
    this.setState({ activeTab: 'pan-verification' });
  };

  // Add a function to change the active tab
  changeActiveTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  // Update the state to enable or disable the next tab
  updateIsDisabled = (isDisabled) => {
    this.setState({ isDisabled });
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
    const { isPANVerified, panInput, email } = this.state;
    return (
      <div className="kyc-success">
        <div className="kyc-head">
          <h2>KYC Successful</h2>
        </div>
        <div className="kyc-row">
          <div className="row">
            <label>Name:</label>
            <input type="text" value={this.state.name} />
          </div>
          <div className="row">
            <label>Date of Birth:</label>
            <input type="text" value={this.state.dob} />
          </div>
          <div className="row">
            <label>Relation:</label>
            <input type="text" value={this.state.care_of} />
          </div>
          {/* <div className="row">
            <label>Ref ID:</label>
            <input type="text" value={this.state.ref_id} />
          </div>
          <div className="row">
            <label>Status:</label>
            <input type="text" value={this.state.status} />
          </div>
          <div className="row">
            <label>Message:</label>
            <input type="text" value={this.state.message} />
          </div> */}
          <div className="row">
            <label>Address:</label>
            <input type="text" value={this.state.address} />
          </div>
          <div className="row">
            <label>Email:</label>
            <input type="text" value={this.state.email} />
          </div>
          <div className="row">
            <label>Gender:</label>
            <input type="text" value={this.state.gender} />
          </div>
          <div className="row">
            <label>Year of Birth:</label>
            <input type="text" value={this.state.year_of_birth} />
          </div>
          <div className="row">
            <label>Mobile Hash:</label>
            <input type="text" value={this.state.mobile_hash} />
          </div>
          {/* <div className="row">
            <label>Photo Link:</label>
            <input type="text" value={this.state.photo_link} />
          </div> */}
          <div className="row">
            <label>PAN Number:</label>
            <input
              type="text"
              onChange={this.handlePANChange}
              value={panInput} // Use the stored PAN value
            />
          </div>
        </div>
        <div className="success-message">
          {this.state.isPANVerified && (
            <p>PAN Verification Successful. Please click Submit button</p>
          )}
        </div>
        <div className="save-btn">
          {!isPANVerified && (
          <button className="saveButton" onClick={this.authenticatePAN} disabled={!panInput}>Verify PAN</button>
          )}
          {this.state.isPANVerified && ( // Only render if showPANVerification is true
          <button className="saveButton" onClick={this.showPANVerification} disabled={!isPANVerified}>
            Submit
          </button>
          )}
        </div>
      </div>

    );
  };


  render() {
    const { activeTab } = this.state;
    return (
      <div className="container-aadhar">
        <TabBar
          activeTab={activeTab}
          onTabChange={this.changeActiveTab}
          isAadharDisabled={!this.state.isAuthenticated || this.state.isAadharCompleted}
          isKycDisabled={!this.state.isAuthenticated || !this.state.isOTPVerified || this.state.isKYCCompleted}
          isSuccessDisabled={!this.state.isAuthenticated || !this.state.isOTPVerified || !this.state.showPANVerification || this.state.isSuccessCompleted}
        />
        {!this.state.isAuthenticated && this.state.activeTab === 'aadhar' && (
          <div className="aadhar">
            <h2>Aadhaar Authentication</h2>
            <label>
              Aadhaar Number:
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX"
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
                value={this.state.storedEmail}
                onChange={this.handleEmailChange}
              />
            </label>
            <button className="classicButton" onClick={this.authenticateAadhar}>Get OTP</button>
          </div>

        )}
        {this.state.isAuthenticated && !this.state.isOTPVerified && this.state.activeTab === 'kyc' && (
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
        {this.state.isOTPVerified && !this.state.showPANVerification && this.state.activeTab === 'success' && (
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
        {this.state.showPANVerification && this.state.activeTab === 'pan-verification' && (
          <div className="successfull">
            <h2>Account Opened Succcessfully</h2>
            <p>Name: {this.state.name}</p>
            <p>Account Number: BE96 4567 7896 4789</p>
          </div>
        )}
      </div>
    );
  }
}



export default AadharAuthentication;
