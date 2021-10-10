const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.post("/api/register", user.register);
router.route("/api/login").get(user.getLogin).post(user.postLogin);
router.post("/api/logout", user.logout);

module.exports = router;
