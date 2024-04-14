const Shop = require("../models/Shop");
const HttpError = require("../models/http-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    const formData = req.body;

    // Check if the shop name already exists
    const existingShopName = await Shop.findOne({
        shopName: formData.shopname,
    });
    if (existingShopName) {
        const error = new HttpError("Shop name already exists", 409);
        return next(error);
    }

    // Check if the email already exists
    const existingEmail = await Shop.findOne({ email: formData.email });
    if (existingEmail) {
        const error = new HttpError("Email already exists", 409);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(formData.password, 12);
    }
    catch {
        const error = new HttpError("Could not Create User. Please Try Again", 500);
        return next(error);
    }



    // If email and shop name don't exist, add to MongoDB
    const newShop = new Shop({
        shopName: formData.shopname,
        shopLocation: formData.shoplocation,
        email: formData.email,
        password: hashedPassword
    });

    await newShop.save();

    let token;
    try {
        token = jwt.sign({ shopId: newShop._id, email: newShop.email }, 'supersecret_dont_share', { expiresIn: '1h' });
    }
    catch {
        const error = new HttpError("Could not Create User. Please Try Again", 500);
        return next(error);
    }




    // Send success response
    res.status(201).json({ message: "Shop added successfully", shopId: newShop.id, email: newShop.email, token: token });
}

const login = async (req, res, next) => {
    const formData = req.body;
    // console.log(req.body);
    // console.log(formData);

    // Check if the email exists
    const existingShop = await Shop.findOne({ email: formData.email });
    if (!existingShop) {
        const error = new HttpError("Email not found", 401);
        return next(error);
    }

    // console.log(existingEmail);

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(formData.password, existingShop.password)
    }
    catch {
        const error = new Error("Could not log you in. Please check your credentials and try Again", 500);
        return next(error);
    }

    // Verify password
    if (!isValidPassword) {
        const error = new Error("Incorrect password", 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({ shopId: existingShop.id, email: existingShop.email }, 'supersecret_dont_share', { expiresIn: '1h' });
    }
    catch {
        const error = new HttpError("Could not Login. Please Try Again", 500);
        return next(error);
    }

    // Login successful
    res.status(200).json({ message: "Login successful", shopId: existingShop.id, email: existingShop.email, token: token });
}

exports.signup = signup;
exports.login = login;