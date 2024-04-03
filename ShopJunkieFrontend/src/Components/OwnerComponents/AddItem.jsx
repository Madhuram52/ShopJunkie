import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddItem() {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [itemNameError, setItemNameError] = useState("");
  const [itemTypeError, setItemTypeError] = useState("");
  const [itemPriceError, setItemPriceError] = useState("");
  const [itemQuantityError, setItemQuantityError] = useState("");
  const [itemLocationError, setItemLocationError] = useState("");

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
    setItemNameError("");
  };

  const handleItemTypeChange = (e) => {
    setItemType(e.target.value);
    setItemTypeError("");
  };

  const handleItemPriceChange = (e) => {
    const price = e.target.value;
    setItemPrice(price);
    setItemPriceError("");
    if (!price || parseFloat(price) <= 0) {
      setItemPriceError("Item price must be greater than 0.");
    }
  };

  const handleItemQuantityChange = (e) => {
    const quantity = e.target.value;
    setItemQuantity(quantity);
    setItemQuantityError("");
    if (!quantity || parseFloat(quantity) <= 0) {
      setItemQuantityError("Item quantity must be greater than 0.");
    }
  };

  const handleItemLocationChange = (e) => {
    setItemLocation(e.target.value);
    setItemLocationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!itemName) {
      setItemNameError("Item name is required.");
      hasError = true;
    }
    if (!itemType) {
      setItemTypeError("Item type is required.");
      hasError = true;
    }
    if (!itemPrice || parseFloat(itemPrice) < 0) {
      setItemPriceError("Item price must be greater than or equal to 0.");
      hasError = true;
    }
    if (!itemQuantity || parseFloat(itemQuantity) < 0) {
      setItemQuantityError("Item quantity must be greater than or equal to 0.");
      hasError = true;
    }
    if (!itemLocation) {
      setItemLocationError("Product location is required.");
      hasError = true;
    }

    if (hasError) {
      return;
    }



    const {shopId } = useParams()
    // Validation passed, perform any action you want with the entered data
    const formData = {
      shopId: shopId,
      productName: itemName,
      productType: itemType,
      productPrice: itemPrice,
      productLocation: itemLocation,
      productQuantity : itemQuantity
    };



    // Reset the form fields after submission
    setItemName("");
    setItemType("");
    setItemPrice("");
    setItemQuantity("");
    setItemLocation("");
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={handleItemNameChange}
          />
          {itemNameError && <p style={{ color: "red" }}>{itemNameError}</p>}
        </div>
        <div>
          <label htmlFor="itemType">Item Type:</label>
          <select
            id="itemType"
            value={itemType}
            onChange={handleItemTypeChange}
          >
            <option value="">Select Type</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="footwear">Footwear</option>
            {/* Add more options as needed */}
          </select>
          {itemTypeError && <p style={{ color: "red" }}>{itemTypeError}</p>}
        </div>
        <div>
          <label htmlFor="itemPrice">Item Price:</label>
          <input
            type="number"
            id="itemPrice"
            value={itemPrice}
            onChange={handleItemPriceChange}
          />
          {itemPriceError && <p style={{ color: "red" }}>{itemPriceError}</p>}
        </div>
        <div>
          <label htmlFor="itemQuantity">Item Quantity:</label>
          <input
            type="number"
            id="itemQuantity"
            value={itemQuantity}
            onChange={handleItemQuantityChange}
          />
          {itemQuantityError && (
            <p style={{ color: "red" }}>{itemQuantityError}</p>
          )}
        </div>
        <div>
          <label htmlFor="itemLocation">Product Location:</label>
          <input
            type="text"
            id="itemLocation"
            value={itemLocation}
            onChange={handleItemLocationChange}
          />
          {itemLocationError && (
            <p style={{ color: "red" }}>{itemLocationError}</p>
          )}
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
