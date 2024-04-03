import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/auth-context";
import axios from "axios";

function Customer({ sname: propSname }) {
  const auth = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { sname: routeSname } = useParams(); // Using useParams to get sid from the route params

  // Determine the sid value based on whether it's passed as a prop or from the route params
  const sname = propSname || routeSname;

  const handleSubmit = () => {
    if (query.trim() !== "") {
      let link = "http://localhost:5000/api/search/" + `${sname}` + "?query=" + `${query}`;
      axios
        .get(link)
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setSearchResults([]);
    }
  };
  

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {searchResults.length > 0 && (
        <>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((product) => (
              <li
                key={product.productName}
                onClick={() => handleProductSelect(product)}
              >
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
