const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productLocation: {
        type: String,
        required: true
    },
    quantityLeft: {
        type: Number,
        required: true
    },
    soldThisMonth: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Product', productSchema);
