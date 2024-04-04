const express = require('express')
const ownerControllers = require("../controllers/owner-controllers")
const router = express.Router();

router.post("/:shopid",ownerControllers.addProducts);


module.exports = router;