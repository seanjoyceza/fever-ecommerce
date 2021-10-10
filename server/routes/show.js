const express = require("express");
const router = express.Router();
const show = require("../controllers/show");

router.get("/api/get", show.get);

module.exports = router;
