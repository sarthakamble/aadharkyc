import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Landing.css';
import {
    Account_Page,
    // ... other constants
} from "../../constants/routes";
class LandingPage extends Component {
    handleSubmit(event) {
        // Redirect to the page for opening a savings account
        window.location = Account_Page; // You can replace this with the actual route
    }

    render() {
        return (
            <div className="landing-page">
                <div className="acc-card">
                    <h1>Welcome to Our Bank</h1>
                    <p>
                        Welcome to our bank's official website. We are here to help you
                        achieve your financial goals and secure your future.
                    </p>
                    <p>
                        Secure your financial future and enjoy the convenience of online banking. Open your online savings account today to start growing your money with us. Click below to get started.
                        [Open Your Savings Account Now]
                    </p>

                    <p>
                        Interested in opening a savings account with us? Click the button
                        below to begin your journey toward financial security.
                    </p>
                    <button className="open-acc" onClick={this.handleSubmit}>Open Savings Account</button>
                </div>
            </div>
        );
    }
}

export default LandingPage;
