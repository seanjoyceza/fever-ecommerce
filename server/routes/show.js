const express = require("express");
const router = express.Router();
const show = require("../controllers/show");
const cors = require("cors");

router.get("/api/get",  show.get);

module.exports = router;
