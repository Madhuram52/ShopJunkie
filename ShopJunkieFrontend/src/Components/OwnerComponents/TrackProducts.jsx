import React, { useState } from 'react';

const TrackProducts = () => {
  // Dummy JSON data representing three products
  const products = [
    {
      productName: "T-shirt",
      productPrice: 20,
      productLocation: "Shelf A, Row 1",
      quantityLeft: 50,
      soldThisMonth: 20,
      productType: "Clothing"
    },
    {
      productName: "Sneakers",
      productPrice: 50,
      productLocation: "Shelf B, Row 2",
      quantityLeft: 0,
      soldThisMonth: 15,
      productType: "Footwear"
    },
    {
      productName: "Granola Bars",
      productPrice: 5,
      productLocation: "Shelf C, Row 3",
      quantityLeft: 100,
      soldThisMonth: 40,
      productType: "Food"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search button click
  const handleSearch = () => {
    const results = products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  // Calculate total inventory overview
  const totalInventory = products.reduce((acc, product) => acc + product.quantityLeft, 0);

  // Filter out-of-stock products
  const outOfStockProducts = products.filter(product => product.quantityLeft === 0);

  return (
    <div>
      <h2>Track Products</h2>
      {/* Search Products */}
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
              <li key={product.productName}>
                <strong>{product.productName}</strong>
                <p>Price: ${product.productPrice}</p>
                <p>Location: {product.productLocation}</p>
                <p>Quantity Left: {product.quantityLeft}</p>
                <p>Sold This Month: {product.soldThisMonth}</p>
                <p>Type: {product.productType}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Inventory Overview */}
      <h3>Inventory Overview:</h3>
      <p>Total Inventory: {totalInventory}</p>

      {/* Out-of-Stock Products */}
      <h3>Out-of-Stock Products:</h3>
      <ul>
        {outOfStockProducts.map(product => (
          <li key={product.productName}>
            {product.productName}-${product.productPrice}
            Sold This Month :{product.soldThisMonth}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackProducts;
