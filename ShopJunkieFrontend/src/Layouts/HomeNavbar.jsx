import React from "react";
import Logo from "./HomeNavbarComponents/Logo";
import NavItemContainer from "./HomeNavbarComponents/NavItemContainer";

function HomeNavbar()
{
    return(
        <div>
            <Logo></Logo>
            <NavItemContainer></NavItemContainer>
        </div>
    )
}

export default HomeNavbar;