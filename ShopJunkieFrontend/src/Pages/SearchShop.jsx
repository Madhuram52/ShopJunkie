import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import axios from 'axios'

function SearchShop() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedShop, setSelectedShop] = useState('');
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);

    useEffect(() => {
        if (query.trim() !== '') {
            axios.get('http://localhost:5000/api/search/shops', {
                params: {
                    query: query // Passing query as a part of params object
                }
            })
                .then(res => {
                    setSuggestions(res.data);
                    setIsSearchDisabled(!res.data.some(shop => shop.shopName === query));
                })
                .catch(err => console.log(err));
        } else {
            setSuggestions([]);
            setIsSearchDisabled(true);
        }
    }, [query]);

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
            <datalist id="shops">
                {suggestions.map((shop, index) => (
                    <option key={index} value={shop.shopName} onClick={() => handleSuggestionClick(shop.shopName)}>{shop.shopName}</option>
                ))}
            </datalist>
            <button disabled={isSearchDisabled} onClick={handleSearchClick}>Search</button>
            {/* Render the Customer component only if sname has a value */}
            {selectedShop && (
                <div>
                    <Customer sname={selectedShop} />
                </div>
            )}
        </>
    );
}

export default SearchShop;
