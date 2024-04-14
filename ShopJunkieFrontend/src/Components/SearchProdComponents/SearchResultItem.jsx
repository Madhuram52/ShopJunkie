
import React from "react";

function SearchResultItem({ product }) {
    return (
        <div className="search-result-item">
            <h4 className="product-name">{product.productName}</h4>
            <p className="product-price">Price: ${product.productPrice}</p>
            <p className="shop-name">Shop Name: {product.shopName}</p>
            <p className="product-location">Location: {product.productLocation}</p>
        </div>
    );
}

export default SearchResultItem;
