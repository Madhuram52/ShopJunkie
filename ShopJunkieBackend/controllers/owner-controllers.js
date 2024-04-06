const Product = require("../models/Product");
const Shop = require("../models/Shop");
const HttpError = require("../models/http-error");

const addProducts = async (req, res, next) => {
    const formData = req.body;

    // console.log("sdfds");

    const shopId = formData.shopId;
    const shop = await Shop.findById(shopId);



    if (!shop) {
        const error = new HttpError("Shop not found", 404)
        return next(error);
    }


    // Check if a product with the same name already exists in the same shop
    const existingProduct = await Product.findOne({ shopId: shopId, productName: formData.productName });

    if (existingProduct) {
        const error = new HttpError("Product already exists in this shop", 400)
        return next(error);
    }

    // If product name doesn't exist in that shop, add to MongoDB
    const newProduct = new Product({
        shopId: shopId,
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


const updateProducts = async (req, res, next) => {
    const formData = req.body;
    console.log(formData);
    const productId = req.params.productid;


    let product = await Product.findById(productId);

    if (formData.productPrice) product.productPrice = formData.productPrice;
    if (formData.productLocation) product.productLocation = formData.productLocation;
    if (formData.productQuantity) product.productQuantity = formData.productQuantity;

    await product.save();

    res.json({ message: 'Product updated successfully' });
}


const deleteProducts = async (req, res, next) => {

    const productId = req.params.productid;

    let product = await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully', product });
}

const fetchAllProducts = async (req, res, next) => {
    console.log("sdfds");
    const shopId = req.params.shopId;
    console.log(shopId);

    const products = await Product.find({ shopId: shopId });

    // Check if products exist for the given shopId

    if (!products || products.length === 0) {
        const error = new HttpError("No products found for the given shop and query", 400);
        return next(error);
    }

    // If products exist, return them
    console.log(products);
    res.status(200).json(products);

}





exports.addProducts = addProducts;
exports.updateProducts = updateProducts;
exports.deleteProducts = deleteProducts;
exports.fetchAllProducts = fetchAllProducts
