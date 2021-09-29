const { check } = require("express-validator");

let validateRegister = [
    check("email", "Invalid email").isEmail().trim(),
    check(
        "password",
        "Invalid password, password must be at least 2 chars long."
    ).isLength({ min: 2 }),
];

module.exports = {
    validateRegister: validateRegister,
};
