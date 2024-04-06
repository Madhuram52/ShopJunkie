import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/auth-context";
import useHttpClient from "../hooks/http-hook"; // Import the useHttpClient hook
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";
// import axios from "axios"; // No longer needed

function Customer(props) {
  const propsId = props.shopId;
  const loadAll = props.loadAll;
  const productSelect = props.onProductSelect;
  const auth = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const { shopid: routeSname } = useParams(); // Using useParams to get sid from the route params

  const routeId =auth.shopId;

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

  const handleProductSelect = (product) =>
  {
    if (productSelect && typeof productSelect === 'function') {
      productSelect(product);
    } else {
      console.log("Product select function not provided or not a function.");
    }
  }

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {isLoading && <LoadingSpinner />}
      {error && <p>{error}</p>}
      {searchResults.length > 0 && (
        <>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((product) => (
              <li key={product.productName} onClick={() => handleProductSelect(product)}>
                <strong>{product.productName}</strong>
                <p>Type: {product.productType}</p>
                <p>Price: ${product.productPrice}</p>
                <p>Location: {product.productLocation}</p>
                {loadAll && <p>Quantity Left: {product.productQuantity}</p>}
                {loadAll && <p>Sold This Month: {product.SoldThisMonth}</p>}
              </li>
            ))}
          </ul>
        </>
      )}
      {auth.isLoggedIn && (
        <div>
          <button>Alarm</button>
        </div>
      )}
      {/* Rendering sid dynamically based on the prop or route */}
      {/* <div>{sname}</div> */}
    </>
  );
}

export default Customer;
