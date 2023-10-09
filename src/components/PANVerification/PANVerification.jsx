import React, { Component } from "react";
import './PANVerification.css'; // Create a new CSS file for PANVerification
import Axios from 'axios';
import { message } from 'antd';

class PANVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panNumber: "",
      otp: "",
      ref_id: "",
      isAuthenticated: false,
      isPANVerified: false,
      code: "",
      timestamp: "",
      transaction_id: "",
      entity: "",
      pan: "",
      full_name: "",
      status: "",
      category: "",
      message: "",
      // Add other fields if needed
    };
  }

  handlePanChange = (event) => {
    this.setState({ panNumber: event.target.value });
  };

  handleOTPChange = (event) => {
    this.setState({ otp: event.target.value });
  };

  authenticatePAN = () => {
    const { panNumber } = this.state;
    const { consent, reason } = this.state;
    //this.setState({ isPANVerified: true });

    // Prepare JSON data to send to the server with the correct variable name
    const jsonData = {
      pan: panNumber, // Use the correct variable name
      consent: consent,
      reason: reason,
    };

    Axios.post('http://localhost:8080/verifypan', jsonData)
      .then(response => {
        if (response.data.message === 'Valid PAN (Individual)' || response.data.message === 'Valid PAN (Company)' ) {
          this.setState({ isPANVerified: true });
          message.success(response.data.message);
          this.retrievePANDetails(response.data);
        } else {
          message.error(response.data.message);
          this.setState({ panNumber: '', isPANVerified: false });
        }
      })
      .catch(error => {
        message.error(error.message);
        console.error('Error:', error);
      });
  };


  retrievePANDetails = (data) => {
    const {
        code,
        timestamp,
        transaction_id,
        entity,
        pan,
        full_name,
        status,
        category,
        message,
        // Add other fields if needed
    } = data;

    this.setState({
        code: code,
        timestamp: timestamp,
        transaction_id: transaction_id,
        entity: entity,
        pan: pan,
        full_name: full_name,
        status: status,
        category: category,
        message: message,
        // Set other fields as needed
    });
  };

  render() {
    return (
      <div className="container-pan">
        {!this.state.isPANVerified && (
          <div className="pan">
            <h2>PAN Verification</h2>
            <label>
              PAN Number:
              <input
                type="text"
                value={this.state.panNumber}
                onChange={this.handlePanChange}
              />
            </label>
            <button className="classicButton" onClick={this.authenticatePAN}>Verify</button>
          </div>
        )}
        {this.state.isPANVerified && (
          <div className="pan-success">
            <h2>PAN Verification Successful</h2>
            <p>Name: {this.state.full_name}</p>
            <p>Code: {this.state.code}</p>
            <p>Timestamp: {this.state.timestamp}</p>
            <p>Transaction ID: {this.state.transaction_id}</p>
            <p>Entity: {this.state.entity}</p>
            <p>PAN: {this.state.pan}</p>
            <p>Status: {this.state.status}</p>
            <p>Category: {this.state.category}</p>
            <p>Message: {this.state.message}</p>
            {/* Add other fields as needed */}
          </div>
        )}
      </div>
    );
  }
}

export default PANVerification;
