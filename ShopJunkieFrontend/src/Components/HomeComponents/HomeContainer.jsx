// HomeContainer.jsx

import React, { useContext } from "react";
import Description from "./Description";
import { AuthContext } from "../../Contexts/auth-context";
import { Link } from "react-router-dom";
import Lottie from "react-lottie"; // Import react-lottie library
import animationData from "../../assets/animations/woman-shopping-online.json"; // Import your .json animation file
import './HomeContainer.css';

function HomeContainer() {
    const auth = useContext(AuthContext);
    const shopId = auth.shopId;

    // Options for Lottie animation
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="home-wrapper">
            {auth.isLoggedIn && (
                <Link to={`/${shopId}/owner`}>
                    <button className="dashboard-button">Go To My Dashboard</button>
                </Link>
            )}
            <div className="home-container">
                <div className="description">
                    <Description />
                    <div className="home-button-container">
                        <Link to="/searchshop">
                            <button>Explore Shops</button>
                        </Link>
                        <Link to="/searchprod">
                            <button>Explore Products</button>
                        </Link>
                    </div>
                </div>
                <div className="animation-container">
                    <Lottie options={defaultOptions} height={450} width={450} />
                </div>
            </div>
        </div>
    )
}

export default HomeContainer;
