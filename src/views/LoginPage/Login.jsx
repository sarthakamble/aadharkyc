import React, { Component } from 'react';
import './Login.css';
import RegistrationForm from "../RegistrationPage/Registration";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorText: "",
            showRegistrationForm: false, // Add this state variable
            headerText: "Sign In", // Add headerText state
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    handleSubmit(event) {
        const formdata = new FormData();
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);
    }

    toggleRegistrationForm = () => {
        this.setState((prevState) => ({
            showRegistrationForm: !prevState.showRegistrationForm,
            headerText: prevState.showRegistrationForm ? "Sign In" : "Register", // Toggle header text
        }));
    };

    render() {
        return (
            <div className="row">
                <div className="synpulse col-lg-7 col-md-7 col-sm-4 col-xs-4">
                    <h1 className="company-name-login">Synpulse8</h1>
                    <div className="sized-box"></div>
                    <div className='synpulse-information'>
                        <h1 className='synpulse-logo'>AadharKYC</h1>
                        <br />
                        <h4>Aadhar Based Authentication & KYC</h4>
                    </div>
                </div>
                <div className="login1 col-lg-5 col-md-5 col-sm-8 col-xs-8">
                    <div className='login-information'>
                        <div className='sized-box1'></div>
                        <div className='center'>
                            <h3><b>{this.state.headerText}</b></h3> {/* Render dynamic header text */}
                            <div className='sized-box1'></div>
                            {this.state.showRegistrationForm ? (
                                <RegistrationForm
                                    onReturnToSignIn={this.toggleRegistrationForm} // Pass this method to return to login
                                />
                            ) : (
                                <form className="loginForm" onSubmit={this.handleSubmit}>
                                    <label>
                                        {/* Username */}

                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Enter User Name"
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label>
                                        <br />
                                        {/* Password */}
                                        <br />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter Password"
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <br />
                                    {
                                        this.state.errorText === "Your password is incorrect. Please try again."
                                            ?
                                            <div style={{ color: "red" }}><img alt="Warning Logo" /><h6> Please Check Your Login Credentials</h6></div>
                                            :
                                            <div></div>
                                    }
                                    <br />
                                    <button type="submit" className="sign-in-button">Login</button>
                                </form>
                            )}
                            <br />
                            <p className="registation">
                                {this.state.showRegistrationForm
                                    ? "Already have an Account, Please"
                                    : "Don't have an account, Please"}{" "}
                                <b onClick={this.toggleRegistrationForm}>
                                    {this.state.showRegistrationForm ? "Login" : "Register"}
                                </b>
                                .
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
