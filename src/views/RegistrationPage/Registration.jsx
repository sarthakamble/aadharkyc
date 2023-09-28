import React, { Component } from "react";
import './Registration.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            registrationSuccess: false,
            errorText: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit(event) {
        // Create an object to hold the registration data
        const formdata = new FormData();
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);
        formdata.append("email", this.state.email);
        // const registrationData = {
        //     username: this.state.username,
        //     email: this.state.email,
        //     password: this.state.password,
        // };

        // Make a POST request to the "/register" endpoint
        
    }

    render() {
        if (this.state.registrationSuccess) {
            return (
                <div>
                    <p className="para">Registration successful!</p>
                    <button className="return" onClick={this.props.onReturnToSignIn}>Return to Sign In</button>
                </div>
            );
        }

        return (
            <form className="register-form" onSubmit={this.handleSubmit}>
                <label>Username
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter User Name"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                </label>
                
                <label>Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                </label>

                <label>Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                </label>
                <div className="btn-container">
                    <button type="submit" className="register-button">Register</button>
                    <button onClick={this.props.onReturnToSignIn} className="register-button">Cancel</button>
                </div>
            </form>

        );
    }
}

export default RegistrationForm;