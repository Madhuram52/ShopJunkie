import React, { useState } from "react";
import axios from 'axios'

function SearchProducts() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {

        if (searchTerm.trim() !== '') {
            axios.get('http://localhost:5000/api/search/products',  {
                params: {
                    query: searchTerm // Passing query as a part of params object
                }
            })
                .then(res => {
                    setSearchResults(res.data);
                })
                .catch(err => console.log(err));
        } else {
            setSearchResults([]);
        }
    };


    return (
        <>
            <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {/* Display search results */}
            {searchResults.length > 0 && (
                <>
                    <h3>Search Results:</h3>
                    <ul>
                        {searchResults.map(product => (
                            <li key={product.productName} onClick={() => handleProductSelect(product)}>
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
