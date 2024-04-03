const Shop = require("../models/Shop");
const HttpError = require("../models/http-error");


const signup = async (req, res, next) => {
    const formData = req.body.formData;

    // Check if the email already exists
    const existingEmail = await Shop.findOne({ email: formData.email });
    if (existingEmail) {
        const error = new HttpError("Email already exists", 409);
        return next(error);
    }

    // Check if the shop name already exists
    const existingShopName = await Shop.findOne({
        shopName: formData.shopname,
    });
    if (existingShopName) {
        const error = new HttpError("Shop name already exists", 409);
        return next(error);
    }

    // If email and shop name don't exist, add to MongoDB
    const newShop = new Shop({
        shopName: formData.shopname,
        shopLocation: formData.shoplocation,
        email: formData.email,
        password: formData.password
    });
    
    await newShop.save();

    // Send success response
    res.status(201).json({ message: "Shop added successfully" });
}

const login = async (req, res, next) => {
    const formData = req.body.formData;

    console.log(formData);

    // Check if the email exists
    const existingEmail = await Shop.findOne({ email: formData.email });
    if (!existingEmail) {
        const error = new HttpError("Email not found", 401);
        return next(error);
    }

    // Verify password
    if (formData.password !== existingEmail.password) {
        const error = new Error("Incorrect password", 401);
        return next(error);
    }

    // Login successful
    res.status(200).json({ message: "Login successful" });
}

exports.signup = signup;
exports.login = login;