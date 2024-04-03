const express = require('express')
const ownerControllers = require("../controllers/owner-controllers")
const router = express.Router();

router.get("/:shopid",ownerControllers.addProducts);


module.exports = router;