import React, { useState } from "react";
import useHttpClient from "../hooks/http-hook"; // Import the custom http hook
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";

function SearchProducts() {
    const { isLoading, error, sendRequest, clearError } = useHttpClient(); // Use the custom http hook

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
        <>
            <input
                type="text"
                placeholder="Search Products"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {/* Display search results */}
            {isLoading && <LoadingSpinner />}
            {error && <p>{error}</p>}
            {!error && !isLoading && searchResults.length > 0 && (
                <>
                    <h3>Search Results:</h3>
                    <ul>
                        {searchResults.map(product => (
                            <li key={product.productName} >
                                <strong>{product.productName}</strong>
                                <p>Price: ${product.productPrice}</p>
                                <p>ShopName: {product.shopName}</p>
                                <p>Location: {product.productLocation}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}

        </>
    );
}

export default SearchProducts;
