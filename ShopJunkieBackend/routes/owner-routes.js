const express = require('express')
const ownerControllers = require("../controllers/owner-controllers")
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.get("/:shopId",ownerControllers.fetchAllProducts);

router.post("/:shopid",ownerControllers.addProducts);

router.patch("/:productid",ownerControllers.updateProducts);

router.delete("/:productid",ownerControllers.deleteProducts);



module.exports = router;