const express = require("express");
const router = express.Router();
const searchControllers = require('../controllers/search-controllers')

router.get("/products", searchControllers.getProducts);

router.get("/shops", searchControllers.getShops);

router.get("/:sname", searchControllers.getProductBySname);

module.exports = router;

