// Footer.jsx

import React from "react";
import Lottie from "react-lottie"; // Import react-lottie library
import instagramAnimation from "../assets/animations/instagram.json";
import whatsappAnimation from "../assets/animations/whatsapp.json";
import gmailAnimation from "../assets/animations/gmail.json";
import './Footer.css'; // Import CSS for Footer styling

function Footer() {
    // Options for Lottie animations
    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2023 ShopJunkie. All rights reserved.</p>
                <h4>Contact Us</h4>
                <ul className="footer-links">
                    <li>
                        <a href="https://www.instagram.com/madhurammodi52/"><Lottie options={{ ...defaultOptions, animationData: instagramAnimation }} height={30} width={30} /></a>
                    </li>
                    <li>
                        <a href=" https://wa.me/917016501905"><Lottie options={{ ...defaultOptions, animationData: whatsappAnimation }} height={30} width={30} /></a>
                    </li>
                    <li>
                        <a href="mailto:example@gmail.com"><Lottie options={{ ...defaultOptions, animationData: gmailAnimation }} height={30} width={30} /></a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
