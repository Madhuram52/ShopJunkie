import React from "react";
import { Link } from "react-router-dom";

function NavItem({ link, children }) {
    return (
        <Link to={link}>
            {children}
        </Link>
    )
}

export default NavItem;