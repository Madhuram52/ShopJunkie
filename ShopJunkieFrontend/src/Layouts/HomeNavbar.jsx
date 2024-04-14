import React from "react";
import Logo from "./HomeNavbarComponents/Logo";
import NavItemContainer from "./HomeNavbarComponents/NavItemContainer";
import './HomeNavbar.css';

function HomeNavbar() {
    return (
        <div className="home-navbar">
            <div className="logo-container">
                <Logo />
            </div>
            <div className="nav-items">
                <NavItemContainer />
            </div>
        </div>
    )
}

export default HomeNavbar;
