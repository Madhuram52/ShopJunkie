import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import useHttpClient from "../hooks/http-hook";
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";

function SearchShop() {
    const [query, setQuery] = useState('');
    // const [query2,setQuery2]=useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    // const [showShop, setShowShop] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/search/shops?query=${query}`
                );
                if (responseData.length == 1 && responseData[0].shopName == query) {
                    setSuggestions([]);
                }
                else {
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
        // console.log("world")
        setQuery(e.target.value);
    };

    const handleSuggestionClick = (shop) => {
        console.log(shop);
        setSelectedShop(shop._id);
        setQuery(shop.shopName)
        // setSuggestions([]);
    };



    return (
        <>
            <div>
                <input type="text" value={query} onChange={handleInputChange} />
            </div>
            <div>
                {error && <p style={{ color: 'blue' }} >{error}</p>}
                {isLoading && <LoadingSpinner />}
                {!error && !isLoading && (
                    <div>
                        {suggestions.map((shop) => (
                            <div key={shop._id} onClick={() => handleSuggestionClick(shop)}>{shop.shopName}</div>
                        ))}
                    </div>
                )}
            </div>
            {/* Render the Customer component only if selectedShop has a value */}
            {selectedShop && (
                <div>
                    <Customer shopId={selectedShop} loadAll = {false} />
                </div>
            )}
        </>
    );
}

export default SearchShop;
