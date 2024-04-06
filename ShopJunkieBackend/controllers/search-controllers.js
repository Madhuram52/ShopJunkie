const Product = require("../models/Product");
const Shop = require("../models/Shop");
const HttpError = require("../models/http-error");

const getProducts = async (req, res, next) => {
    const query = req.query.query;

    if (!query) {
        const error = new HttpError("Query parameter is missing", 400);
        return next(error);
    }

    try {
        console.log("Query:", query); // Logging the query for debugging

        const products = await Product.find({
            productName: { $regex: query, $options: "i" }
        });

        console.log("Products:", products); // Logging products for debugging

        if (!products || products.length === 0) {
            const error = new HttpError("No products found", 404);
            return next(error);
        }

        // Extracting unique shopIds from products
        const shopIds = [...new Set(products.map(product => product.shopId))];

        // Fetching shop details for each unique shopId
        const shopDetails = await Shop.find({ _id: { $in: shopIds } });

        // Mapping shop details to shopIds
        const shopMap = {};
        shopDetails.forEach(shop => {
            shopMap[shop._id] = shop.shopName;
        });

        // Add shopName to each product object
        const productsWithShopName = products.map(product => ({
            ...product._doc,
            shopName: shopMap[product.shopId]
        }));

        // console.log(productsWithShopName);
        res.status(200).json(productsWithShopName);
    } catch (error) {
        // Handle any potential errors
        return next(error);
    }
}



const getShops = async (req, res, next) => {
    const query = req.query.query; // Retrieve the query from query parameters

    const shops = await Shop.find({
        shopName: { $regex: query, $options: "i" },
    });

    if (!shops || shops.length === 0) {
        const error = new HttpError("No shops found", 404);
        return next(error);
    }

    res.status(200).json(shops);
}

const getProductBySname = async (req, res, next) => {
    const shopId = req.params.shopId;
    const query = req.query.query;


    const products = await Product.find({
        shopId: shopId,
        productName: { $regex: query, $options: "i" },
    });

    // console.log(products);

    if (!products || products.length === 0) {
        const error = new HttpError("No products found for the given shop and query", 404);
        return next(error);
    }

    res.status(200).json(products);
}

exports.getProducts = getProducts;
exports.getShops = getShops;
exports.getProductBySname = getProductBySname;