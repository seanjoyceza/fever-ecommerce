const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart");

router.post("/api/addToCart", cart.addToCart);
router.post("/api/updateCartItem", cart.updateCartItem);

module.exports = router;
