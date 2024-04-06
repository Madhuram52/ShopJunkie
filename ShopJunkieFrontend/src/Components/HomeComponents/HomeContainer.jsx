import React, { useContext } from "react";
import Description from "./Description";
import SearchShops from "./SearchShops";
import { AuthContext } from "../../Contexts/auth-context";
import { Link } from "react-router-dom";

function HomeContainer() {
    const auth = useContext(AuthContext);
    const shopId = auth.shopId;
    return (
        <div>
            <Description></Description>
            <SearchShops></SearchShops>
            {auth.isLoggedIn && (
                <Link to={`/${shopId}/owner`}>
                    <button>Go To My DashBoard</button>
                </Link>
            )}
        </div>
    )
}

export default HomeContainer;