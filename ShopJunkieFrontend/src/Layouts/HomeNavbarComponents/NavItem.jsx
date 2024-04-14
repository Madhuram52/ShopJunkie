import React from "react";
import { Link } from "react-router-dom";

function NavItem({ link, children }) {
    return (
        <Link to={link} className="nav-item">
            {children}
        </Link>
    )
}

export default NavItem;
