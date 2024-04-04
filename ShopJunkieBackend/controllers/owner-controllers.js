const Product = require("../models/Product");
const Shop = require("../models/Shop");
const HttpError = require("../models/http-error");

const addProducts = async (req, res, next) => {
    const formData = req.body;

    // console.log("sdfds");

    const shopId = formData.shopId; 
    const shop = await Shop.findById(shopId);

    if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
    }

    const shopName = shop.shopName; 

    // Check if a product with the same name already exists in the same shop
    const existingProduct = await Product.findOne({ shopName: shopName, productName: formData.productName });

    if (existingProduct) {
        return res.status(400).json({ message: "Product already exists in this shop" });
    }

    // If product name doesn't exist in that shop, add to MongoDB
    const newProduct = new Product({
        shopName: shopName,
        productName: formData.productName,
        productType: formData.productType,
        productLocation: formData.productLocation,
        productPrice: formData.productPrice,
        productQuantity: formData.productQuantity,
    });

    await newProduct.save();

    // Send success response
    res.status(201).json({ message: "Product added successfully" });
}



const getProductBySname = async (req, res, next) => {
    const sname = req.params.sname;
    const query = req.query.query;

    const products = await Product.find({
        shopName: sname,
        productName: { $regex: query, $options: "i" },
    });

    if (!products || products.length === 0) {
        const error = new HttpError("No products found for the given shop and query", 404);
        return next(error);
    }

    res.status(200).json(products);
}

exports.addProducts = addProducts;
// exports.getShops = getShops;
exports.getProductBySname = getProductBySname;