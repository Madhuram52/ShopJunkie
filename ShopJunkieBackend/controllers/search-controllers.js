const Product = require("../models/Product");
const Shop = require("../models/Shop");
const HttpError = require("../models/http-error");

const getProducts = async (req, res, next) => {
    const query = req.query.query;

    console.log(query);

    const products = await Product.find({
        productName: { $regex: query, $options: "i" },
    });

    if (!products || products.length === 0) {
        const error = new HttpError("No products found", 404);
        return next(error);
    }

    res.status(200).json(products);
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

exports.getProducts = getProducts;
exports.getShops=getShops;
exports.getProductBySname=getProductBySname;