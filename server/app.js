const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 3001;
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { validationResult, check } = require("express-validator");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(
    session({
        key: "userId",
        secret: "thisshouldbeabettersecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24 * 1000,
        },
    })
);
app.use(flash());
// end middleware

//get products
const db = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.get("/api/get", async (req, res) => {
    db.query("SELECT * from products", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});
//end get products

//register
app.post(
    "/api/register",
    [
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
    }
);
//end register

//login
app.get("/api/login", async (req, res) => {
    if (req.session.user) {
        console.log(req.session.user[0].UserEmail);

        res.send({ loggedIn: true, user: req.session.user[0] });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post(
    "/api/login",
    [
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
    }
);
//end login

//logout
app.post("/api/logout", async (req, res) => {
    // console.log("logout route hit");
    res.clearCookie("_random_cookie_name", {
        path: "/",
        domain: ".awesomedomain.co",
    });

    res.clearCookie("userId").send();
});
//end logout

//Add Cart
app.post("/api/addToCart", async (req, response) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const size = req.body.size;

    db.query(
        "SELECT * FROM UserCartItems WHERE UserID = userId AND ProductID = productId AND Size = size",
        // [userId, productId, size],
        (err, res) => {
            if (res.length === 0) {
                console.log("not found!");
                const sqlInsert =
                    "INSERT INTO UserCartItems (UserID, ProductID, Quantity, Size) VALUES (?,?,?,?)";
                db.query(
                    sqlInsert,
                    [userId, productId, quantity, size],
                    (err, result) => {
                        if (!err) {
                            message = "success";
                            console.log(message);
                            response.send(message);
                        } else {
                            console.log(err);
                        }
                    }
                );
            } else {
                //HERE YOU JUST NEED TO CHANGE THE QUANTITY VALUE AFTER THE VALUE IS FOUND
                console.log("found!");
            }
        }
    );

    //add to cart
});

//increment cart
app.post("/api/updateCartItem", async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const increment = req.body.increment;

    if (increment === 1) {
        const sqlInsert =
            "UPDATE UserCartItems SET Quantity = Quantity + 1 WHERE (UserID = ? and ProductID = ?)";
        db.query(sqlInsert, [userId, productId], (err, result) => {
            if (!err) {
                message = "success";
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
            }
        });
    } else {
        const sqlInsert =
            "UPDATE UserCartItems SET Quantity = Quantity - 1 WHERE (UserID = ? and ProductID = ?)";
        db.query(sqlInsert, [userId, productId], (err, result) => {
            if (!err) {
                message = "success";
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
            }
        });
    }
});
//

//

//listen on env port or port 3001
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
