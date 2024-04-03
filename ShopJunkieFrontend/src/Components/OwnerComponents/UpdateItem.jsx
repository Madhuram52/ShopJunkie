import React, { useState } from 'react';

function UpdateItem() {
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
      quantityLeft: 30,
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateFields, setUpdateFields] = useState({
    price: '',
    location: '',
    quantity: ''
  });

  // Function to handle search button click
  const handleSearch = () => {
    if (searchTerm != '') {
      const results = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setSelectedProduct(null);
    }
    else {
      // console.log("sdf");
      setSearchResults([]);
      setSelectedProduct(null);
    }
  };

  // Function to handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Function to handle update of product fields
  const handleFieldChange = (e, field) => {
    setUpdateFields(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  // Function to handle updating the selected product
  const handleUpdateProduct = () => {
    // console.log(updateFields);

      const updatedProduct = {
        ...selectedProduct,
        productPrice: updateFields.price || selectedProduct.productPrice,
        productLocation: updateFields.location || selectedProduct.productLocation,
        quantityLeft: updateFields.quantity || selectedProduct.quantityLeft
      };
      // Replace the updated product in the search results
      const updatedResults = searchResults.map(product =>
        product.productName === selectedProduct.productName ? updatedProduct : product
      );
      // Update the state with the new search results
      setSearchResults(updatedResults);
      // Reset selected product and update fields after update
      setSelectedProduct(null);
      setUpdateFields({
        price: '',
        location: '',
        quantity: ''
      });
  };


  // Function to handle removing the selected product
  const handleRemoveProduct = () => {

    // Filter out the selected product from the search results
    const updatedResults = searchResults.filter(product =>
      product.productName !== selectedProduct.productName
    );
    // Update the state with the new search results
    setSearchResults(updatedResults);
    // Reset selected product and update fields after removal
    setSelectedProduct(null);
    setUpdateFields({
      price: '',
      location: '',
      quantity: ''
    });
    // Clear the search term
    setSearchTerm('');
  };

  return (
    <div>
      <h2>Update Item</h2>
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
              <li key={product.productName} onClick={() => handleProductSelect(product)}>
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

      {/* Update Fields */}
      {selectedProduct && (
        <div>
          <h3>Update {selectedProduct.productName}:</h3>
          <input
            type="text"
            placeholder="New Price"
            value={updateFields.price}
            onChange={e => handleFieldChange(e, 'price')}
          />
          <input
            type="text"
            placeholder="New Location"
            value={updateFields.location}
            onChange={e => handleFieldChange(e, 'location')}
          />
          <input
            type="text"
            placeholder="New Quantity"
            value={updateFields.quantity}
            onChange={e => handleFieldChange(e, 'quantity')}
          />
          <button onClick={handleUpdateProduct}>Update</button>
          <button onClick={handleRemoveProduct}>Remove Product</button>
          {/* Add more buttons for other update options */}
        </div>
      )}

      {/* Display message for removed product */}
      {selectedProduct && !searchResults.includes(selectedProduct) && (
        <p>{selectedProduct.productName} is removed.</p>
      )}
    </div>
  );


}
export default UpdateItem;
