import React from "react";
import { Link } from "react-router-dom";

function SearchShops() {

    return (
        <>
            <Link to="/searchshop">
                <button>
                    Explore Shops
                </button>
            </Link>
            <Link to="/searchprod">
                <button>
                    Explore Products
                </button>
            </Link>
        </>
    );
}

export default SearchShops;
