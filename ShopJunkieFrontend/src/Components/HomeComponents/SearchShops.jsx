import React from "react";
import { Link } from "react-router-dom";

function SearchShops() {
    return (
        <div className="search-button-container">
            <Link to="/searchshop">
                <button>Explore Shops</button>
            </Link>
            <Link to="/searchprod">
                <button>Explore Products</button>
            </Link>
        </div>
    );
}

export default SearchShops;
