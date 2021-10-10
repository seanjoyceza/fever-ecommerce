const { validationResult, check } = require("express-validator");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

module.exports.register =
    ([
        check("email", "email").isEmail().trim(),
        check("password", "password").isLength({ min: 2 }),
    ],
    async (req, res) => {
        const userFirstName = req.body.firstName;
        const userLastName = req.body.lastName;
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        //verify information received from client
        let errorsArr = [];
        let validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            let errors = Object.values(validationErrors.mapped());
            errors.forEach((item) => {
                errorsArr.push(item.msg);
            });
            // req.flash("errors", errorsArr);
            let message;
            if (errorsArr.length === 2) {
                message = [
                    "Invalid email!",
                    "Password must be at least 2 chars long!",
                ];
                return res.send([message, "both"]);
            } else if (errorsArr[0] == "email") {
                return res.send([message, "email!"]);
            } else if (errorsArr[0] == "password") {
                message = "Password must be at least 2 chars long!";
                return res.send([message, "password"]);
            }
        } else {
            console.log("all good!");
        }
        //end verify

        db.query(
            "SELECT * FROM users WHERE UserEmail = ?",
            userEmail,
            (err, result) => {
                if (result.length > 0) {
                    message = "Email is already registered!";
                    res.send([message, "exists"]);
                    return;
                } else {
                    bcrypt.hash(userPassword, saltRounds, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }

                        const sqlInsert =
                            "INSERT INTO users (userFirstName, userLastName,userEmail, userPassword) VALUES (?,?,?,?)";
                        db.query(
                            sqlInsert,
                            [userFirstName, userLastName, userEmail, hash],
                            (err, result) => {
                                if (!err) {
                                    message = "success";
                                    res.send([message, userEmail]);
                                } else {
                                    console.log(err);
                                }
                            }
                        );
                    });
                }
            }
        );
    });

module.exports.getLogin = async (req, res) => {
    if (req.session.user) {
        console.log(req.session.user[0].UserEmail);

        res.send({ loggedIn: true, user: req.session.user[0] });
    } else {
        res.send({ loggedIn: false });
    }
};

module.exports.postLogin =
    ([
        check("email", "email").isEmail().trim(),
        check("password", "password").isLength({ min: 2 }),
    ],
    async (req, res) => {
        //verify information received from client
        let errorsArr = [];
        let validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            let errors = Object.values(validationErrors.mapped());
            errors.forEach((item) => {
                errorsArr.push(item.msg);
            });
            // req.flash("errors", errorsArr);
            let message;
            if (errorsArr.length === 2) {
                message = [
                    "Invalid email!",
                    "Password must be at least 2 chars long!",
                ];
                return res.send([message, "both"]);
            } else if (errorsArr[0] == "email") {
                return res.send([message, "email!"]);
            } else if (errorsArr[0] == "password") {
                message = "Password must be at least 2 chars long!";
                return res.send([message, "password"]);
            }
        } else {
            console.log("all good!");
        }
        //end verify

        const email = req.body.email;
        const password = req.body.password;

        db.query(
            "SELECT * FROM users WHERE UserEmail = ?",
            email,
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                }

                if (result.length > 0) {
                    bcrypt.compare(
                        password,
                        result[0].UserPassword,
                        (error, response) => {
                            if (response) {
                                console.log("Logged in!");
                                req.session.user = result;
                                res.send({
                                    result: result,
                                    message: "Successfully logged in!",
                                });
                            } else {
                                console.log("wrong");
                                message =
                                    "Incorrect email or password combination!";
                                res.send([message, "wrong"]);
                            }
                        }
                    );
                } else {
                    console.log("wrong2");
                    res.send("wrong");
                }
            }
        );
    });

module.exports.logout = async (req, res) => {
    res.clearCookie("_random_cookie_name", {
        path: "/",
        domain: ".awesomedomain.co",
    }),
        res.clearCookie("userId").send();
};
