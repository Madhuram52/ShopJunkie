// SearchProducts.jsx

import React, { useState } from "react";
import useHttpClient from "../hooks/http-hook"; // Import the custom http hook
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";
import SearchResultItem from "../Components/SearchProdComponents/SearchResultItem";
import "./SearchProducts.css"; // Import CSS for SearchProducts styling

function SearchProducts() {
    const { isLoading, error, sendRequest } = useHttpClient(); // Use the custom http hook

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (query.trim() !== '') {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/search/products?query=${query}`);
                setSearchResults(responseData);
            } catch (err) {
                // Error handling
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="search-products-wrapper">
            <div className="search-products-container">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Search Products"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {/* Display search results */}
                {isLoading && <LoadingSpinner />}
                {error && <p>{error}</p>}
                {!error && !isLoading && searchResults.length > 0 && (
                    <>
                        <h3 className="search-results-title">Search Results:</h3>
                        <div className="search-results-list">
                            {searchResults.map(product => (
                                <SearchResultItem key={product._id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchProducts;
