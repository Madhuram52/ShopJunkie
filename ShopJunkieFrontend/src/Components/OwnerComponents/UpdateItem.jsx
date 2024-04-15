import React, { useState, useEffect, useContext } from 'react';
import Customer from '../../Pages/Customer';
import useHttpClient from '../../hooks/http-hook'; // Update the path to your useHttpClient hook
import { AuthContext } from '../../Contexts/auth-context';
import LoadingSpinner from '../UI Elements/LoadingSpinner';

function UpdateItem() {
  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateFields, setUpdateFields] = useState({
    price: '',
    location: '',
    quantity: ''
  });
  const [refreshCustomer, setRefreshCustomer] = useState(false); // State to trigger refresh
  const [message, setMessage] = useState('');

  const handleSearch = async (result) => {
    try {
      setSelectedProduct(result);
    } catch (err) {
      console.error('Error occurred while searching:', err);
    }
  };

  const handleFieldChange = (e, field) => {
    setUpdateFields(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        ...selectedProduct,
        productPrice: updateFields.price || selectedProduct.productPrice,
        productLocation: updateFields.location || selectedProduct.productLocation,
        productQuantity: updateFields.quantity || selectedProduct.productQuantity
      };
      const responseData = await sendRequest(`http://localhost:5000/api/owner/${selectedProduct._id}`, 'PATCH', updatedProduct, { Authorization: 'Bearer ' + auth.token });
      console.log('Product updated successfully:', responseData);
      setSelectedProduct(null);
      setUpdateFields({
        price: '',
        location: '',
        quantity: ''
      });
      setMessage('Product updated successfully');
      setRefreshCustomer(true); // Trigger Customer component refresh
    } catch (err) {
      console.error('Error occurred while updating product:', err);
    }
  };

  const handleRemoveProduct = async () => {
    try {
      const responseData = await sendRequest(`http://localhost:5000/api/owner/${selectedProduct._id}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
      console.log('Product removed successfully:', responseData);
      setSelectedProduct(null);
      setMessage('Product removed successfully');
      setRefreshCustomer(true); // Trigger Customer component refresh
    } catch (err) {
      console.error('Error occurred while removing product:', err);
    }
  };

  useEffect(() => {
    // Reset refreshCustomer state after 1 second to avoid continuous refresh
    const timer = setTimeout(() => {
      setRefreshCustomer(false);
      setMessage('');
    }, 1000);
    return () => clearTimeout(timer);
  }, [refreshCustomer]);

  return (
    <div className="update-item-container">
      <Customer key={refreshCustomer} loadAll={true} onProductSelect={handleSearch} />
      {/* Update Fields */}
      {selectedProduct && (
        <div>
          <h3 className="update-item-heading">Update {selectedProduct.productName}:</h3>
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
          <button onClick={handleUpdateProduct} className="update-item-btn">Update</button>
          <button onClick={handleRemoveProduct} className="remove-item-btn">Remove Product</button>
        </div>
      )}

      {/* Display error message */}
      {error && <p className="error-msg">Error: {error}</p>}
      {/* Display loading indicator */}
      {isLoading && <LoadingSpinner />}
      {/* Display success message */}
      {message && <p className="success-msg">{message}</p>}
    </div>
  );
}

export default UpdateItem;
