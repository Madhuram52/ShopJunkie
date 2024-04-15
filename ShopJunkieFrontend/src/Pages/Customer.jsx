import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/auth-context";
import useHttpClient from "../hooks/http-hook"; // Import the useHttpClient hook
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";
import './Customer.css';
// import axios from "axios"; // No longer needed

function Customer(props) {
  const propsId = props.shopId;
  const loadAll = props.loadAll;
  const productSelect = props.onProductSelect;
  const auth = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const { shopid: routeSname } = useParams(); // Using useParams to get sid from the route params

  const routeId = auth.shopId;

  const { isLoading, error, sendRequest, clearError } = useHttpClient(); // Initialize the useHttpClient hook

  // Determine the sid value based on whether it's passed as a prop or from the route params
  const shopId = propsId || routeId;

  const handleSubmit = async () => {
    if (query.trim() !== "") {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/search/${shopId}?query=${query}`
        );
        setSearchResults(responseData);
      } catch (err) {
        setSearchResults([]);
        console.log(err.response.data.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductSelect = (product) => {
    if (productSelect && typeof productSelect === 'function') {
      productSelect(product);
    } else {
      console.log("Product select function not provided or not a function.");
    }
  }

  return (
    <div className="customer-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSubmit} className="search-btn">Submit</button>
      {isLoading && <LoadingSpinner />}
      {error && <p className="error-msg">{error}</p>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3 className="search-results-heading">Search Results:</h3>
          <ul className="product-list">
            {searchResults.map((product) => (
              <li key={product.productName} onClick={() => handleProductSelect(product)} className="product-item">
                <strong className="product-name">{product.productName}</strong>
                <p className="product-info">Type: {product.productType}</p>
                <p className="product-info">Price: ${product.productPrice}</p>
                <p className="product-info">Location: {product.productLocation}</p>
                {loadAll && <p className="product-info">Quantity Left: {product.productQuantity}</p>}
                {loadAll && <p className="product-info">Sold This Month: {product.SoldThisMonth}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {auth.isLoggedIn && !loadAll && (
        <div>
          <button className="alarm-btn">Alarm</button>
        </div>
      )}
      {/* Rendering sid dynamically based on the prop or route */}
      {/* <div>{sname}</div> */}
    </div>
  );
}

export default Customer;
