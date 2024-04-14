// SearchShop.jsx

import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import useHttpClient from "../hooks/http-hook";
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";
import "./SearchShop.css"; // Import CSS for SearchShop styling

function SearchShop() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const { isLoading, error, sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/search/shops?query=${query}`
                );
                if (responseData.length === 1 && responseData[0].shopName === query) {
                    setSuggestions([]);
                } else {
                    setSuggestions(responseData);
                }
            } catch (err) {
                // Handle error if needed
            }
        };

        if (query.trim() !== '') {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [query, sendRequest]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSuggestionClick = (shop) => {
        setSelectedShop(shop._id);
        setQuery(shop.shopName)
    };

    return (
        <div className="search-shop-container">
            <div className="search-input-container">
                <input type="text" value={query} onChange={handleInputChange} placeholder="Search Shops" />
            </div>
            <div className="suggestions-container">
                {error && <p className="error-message">{error}</p>}
                {isLoading && <LoadingSpinner />}
                {!error && !isLoading && (
                    <div className="suggestions-list">
                        {suggestions.map((shop) => (
                            <div key={shop._id} onClick={() => handleSuggestionClick(shop)} className="suggestion-item">
                                {shop.shopName}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Render the Customer component only if selectedShop has a value */}
            {selectedShop && (
                <div className="customer-container">
                    <Customer shopId={selectedShop} loadAll={false} />
                </div>
            )}
        </div>
    );
}

export default SearchShop;
