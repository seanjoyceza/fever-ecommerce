const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart");

router.route("http://localhost3000/api/logout").post(cart.logout);

module.exports = router;
