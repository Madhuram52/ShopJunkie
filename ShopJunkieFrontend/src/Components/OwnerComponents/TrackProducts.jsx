import React, { useState, useEffect, useContext } from 'react';
import Customer from '../../Pages/Customer';
import useHttpClient from '../../hooks/http-hook';
import { AuthContext } from '../../Contexts/auth-context';
import LoadingSpinner from '../UI Elements/LoadingSpinner';

const TrackProducts = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/owner/${auth.shopId}`,'GET',null,{ Authorization: 'Bearer ' + auth.token });
        setProducts(responseData);
      } catch (err) {
        // Handle error
      }
    };

    fetchProducts();
  }, [sendRequest, auth.shopId]);

  return (
    <div>
      <h2>Track Products</h2>
      <Customer loadAll={true} />

      <h3>Inventory Overview:</h3>
      <ul>
      {isLoading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
        {products.map((product) => (
          <li key={product.productName}>
            {product.productName} - ${product.productPrice}
            Sold This Month: {product.soldThisMonth}
          </li>
        ))}
      </ul>

      <h3>Out-of-Stock Products:</h3>
      <ul>
      {isLoading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
        {products
          .filter((product) => product.productQuantity === 0)
          .map((product) => (
            <li key={product.productName}>
              {product.productName} - ${product.productPrice}
              Sold This Month: {product.soldThisMonth}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TrackProducts;
