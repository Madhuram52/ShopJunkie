import React ,{useContext} from "react";
import NavItem from "./NavItem";
import { AuthContext } from "../../Contexts/auth-context";
import { Link } from "react-router-dom";

function NavItemContainer() {
    const auth = useContext(AuthContext);
    return (
        <>
            <NavItem link="#">About Us</NavItem>
            <NavItem link="#">Contact Us</NavItem>
            {!auth.isLoggedIn && (
                        <Link to="/auth">
                            <button className="user-link">Sign Up/Log In</button>
                        </Link>
                    )}

                {auth.isLoggedIn && (
                            <button className="user-link" onClick={auth.logout}>LOG OUT</button>
                    )}
        </>
    )
}
export default NavItemContainer