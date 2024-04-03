// const mongoose = require('mongoose');
// const config = require('./config');
// const Product = require('./models/Product');

// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB connected');

//         // Array of products to be added to the database
//         const products = [
//             {
//                 productName: "T-shirt",
//                 productPrice: 20,
//                 productLocation: "Shelf A, Row 1",
//                 quantityLeft: 50,
//                 soldThisMonth: 20,
//                 productType: "Clothing",
//                 shopName: "shop123"
//             },
//             {
//                 productName: "Sneakers",
//                 productPrice: 50,
//                 productLocation: "Shelf B, Row 2",
//                 quantityLeft: 30,
//                 soldThisMonth: 15,
//                 productType: "Footwear",
//                 shopName: "shop456"
//             },
//             {
//                 productName: "Granola Bars",
//                 productPrice: 5,
//                 productLocation: "Shelf C, Row 3",
//                 quantityLeft: 100,
//                 soldThisMonth: 40,
//                 productType: "Food",
//                 shopName: "shop789"
//             }
//         ];

//         // Insert products into the database
//         Product.insertMany(products)
//             .then(() => {
//                 console.log('Products added to the database');
//                 mongoose.connection.close();
//             })
//             .catch(err => {
//                 console.error('Error adding products to the database:', err);
//                 mongoose.connection.close();
//             });
//     })
//     .catch(err => console.error('MongoDB connection error:', err));


const mongoose = require('mongoose');
const config = require('./config');
const Shop = require('./models/Shop');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

        // Array of shops to be added to the database
        const shops = [
            {
                shopName: "shop123",
                shopLocation: "Location A",
                email: "shop123@example.com",
                password: "password123"
            },
            {
                shopName: "shop456",
                shopLocation: "Location B",
                email: "shop456@example.com",
                password: "password456"
            },
            {
                shopName: "shop789",
                shopLocation: "Location C",
                email: "shop789@example.com",
                password: "password789"
            }
        ];

        // Insert shops into the database
        Shop.insertMany(shops)
            .then(() => {
                console.log('Shops added to the database');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error('Error adding shops to the database:', err);
                mongoose.connection.close();
            });
    })
    .catch(err => console.error('MongoDB connection error:', err));
