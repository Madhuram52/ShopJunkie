import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import useHttpClient from "../hooks/http-hook";
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";

function SearchShop() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedShop, setSelectedShop] = useState('');
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/search/shops?query=${query}`
                );
                setSuggestions(responseData);
                setIsSearchDisabled(!responseData.some(shop => shop.shopName === query));
            } catch (err) {
                // Handle error if needed
            }
        };

        if (query.trim() !== '') {
            fetchSuggestions();
        } else {
            setSuggestions([]);
            setIsSearchDisabled(true);
        }
    }, [query, sendRequest]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setSelectedShop('');
    };

    const handleSuggestionClick = (shopName) => {
        setQuery(shopName);
        setSelectedShop(shopName);
    };

    const handleSearchClick = () => {
        setSelectedShop(query);
    };

    return (
        <>
            <input type="text" value={query} onChange={handleInputChange} list="shops" />
            <div>
                {error && <p style={{ color: 'blue' }} >{error}</p>}
                {isLoading && <LoadingSpinner />}
                <datalist id="shops">
                    {suggestions.map((shop, index) => (
                        <option key={index} value={shop.shopName} onClick={() => handleSuggestionClick(shop.shopName)}>{shop.shopName}
                        </option>
                    ))}
                </datalist>
            </div>
            <button disabled={isSearchDisabled} onClick={handleSearchClick}>Search</button>
            {/* Render the Customer component only if selectedShop has a value */}
            {selectedShop && (
                <div>
                    <Customer sname={selectedShop} />
                </div>
            )}
        </>
    );
}

export default SearchShop;
