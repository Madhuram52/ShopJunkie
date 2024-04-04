import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/auth-context";
import useHttpClient from "../hooks/http-hook"; // Import the useHttpClient hook
import LoadingSpinner from "../Components/UI Elements/LoadingSpinner";
// import axios from "axios"; // No longer needed

function Customer({ sname: propSname }) {
  const auth = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { sname: routeSname } = useParams(); // Using useParams to get sid from the route params

  const { isLoading, error, sendRequest, clearError } = useHttpClient(); // Initialize the useHttpClient hook

  // Determine the sid value based on whether it's passed as a prop or from the route params
  const sname = propSname || routeSname;

  const handleSubmit = async () => {
    if (query.trim() !== "") {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/search/${sname}?query=${query}`
        );
        setSearchResults(responseData);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResults([]);
    }
  };

  // handleProductSelect function definition is missing in the provided code

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
              <li key={product.productName}>
                <strong>{product.productName}</strong>
                <p>Type: {product.productType}</p>
                <p>Price: ${product.productPrice}</p>
                <p>Location: {product.productLocation}</p>
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
      <div>{sname}</div>
    </>
  );
}

export default Customer;
