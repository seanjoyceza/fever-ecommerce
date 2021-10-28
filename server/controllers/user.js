const { validationResult, check } = require("express-validator");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
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
        console.log(req.session);
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
                        const UserCartID = v4();
                        const sqlInsert =
                            "INSERT INTO users (userFirstName, userLastName,userEmail, userPassword, UserCartID) VALUES (?,?,?,?,?)";
                        db.query(
                            sqlInsert,
                            [
                                userFirstName,
                                userLastName,
                                userEmail,
                                hash,
                                UserCartID,
                            ],
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
            //join 2 tables, add userEmail to UserCartItems table
            // "SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate FROM Orders INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID",
            "SELECT * FROM users WHERE UserEmail = ?",
            email,
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                }

                if (result.length > 0) {
                    const userId = result[0].UserID;
                    bcrypt.compare(
                        password,
                        result[0].UserPassword,
                        (error, response) => {
                            if (response) {
                                console.log("Logged in!");
                                req.session.user = result;
                                //when logged in, fetch the user CART as well
                                console.log("Searching for Cart...");
                                db.query(
                                    "SELECT * FROM UserCartItems WHERE UserID = ?",
                                    userId,
                                    (err, response1) => {
                                        if (response1.length === 0) {
                                            console.log("No initial cart!");
                                            const cart = [];
                                            totalAmount = 0;

                                            db.query(
                                                "SELECT * FROM UserOrderItems WHERE UserID = ?",
                                                userId,
                                                (err, response4) => {
                                                    if (response4) {
                                                        const userOrders =
                                                            response4;
                                                        // console.log(userOrders);
                                                        res.send({
                                                            userOrders:
                                                                userOrders,
                                                            cart: cart,
                                                            totalAmount:
                                                                totalAmount,
                                                            result: result,
                                                            message:
                                                                "Successfully logged in!",
                                                        });
                                                    } else {
                                                        console.log("error!");
                                                    }
                                                }
                                            );
                                        } else {
                                            let cart = [];
                                            for (
                                                i = 0;
                                                i < response1.length;
                                                i++
                                            ) {
                                                const cartItem = {
                                                    id: response1[i].ProductID,
                                                    quantity:
                                                        response1[i].Quantity,
                                                    size: response1[i].Size,
                                                };
                                                cart.push(cartItem);
                                            }
                                            // console.log(cart);

                                            db.query(
                                                "SELECT * FROM products",
                                                (err, response2) => {
                                                    if (response2) {
                                                        cart.forEach(
                                                            (element) => {
                                                                for (
                                                                    i = 0;
                                                                    i <
                                                                    response2.length;
                                                                    i++
                                                                ) {
                                                                    if (
                                                                        element.id ===
                                                                        response2[
                                                                            i
                                                                        ].id
                                                                    ) {
                                                                        element[
                                                                            "title"
                                                                        ] =
                                                                            response2[
                                                                                i
                                                                            ].title;
                                                                        element[
                                                                            "image"
                                                                        ] =
                                                                            response2[
                                                                                i
                                                                            ].image;
                                                                        element[
                                                                            "price"
                                                                        ] =
                                                                            response2[
                                                                                i
                                                                            ].price;
                                                                    }
                                                                }
                                                            }
                                                        );
                                                        let totalAmount = 0;
                                                        cart.forEach(
                                                            (element) => {
                                                                totalAmount +=
                                                                    +element.quantity *
                                                                    +element.price;
                                                            }
                                                        );

                                                        //when logged in, fetch the user ORDERS as well
                                                        db.query(
                                                            "SELECT * FROM UserOrderItems WHERE UserID = ?",
                                                            userId,
                                                            (
                                                                err,
                                                                response4
                                                            ) => {
                                                                if (response4) {
                                                                    const userOrders =
                                                                        response4;
                                                                    // console.log(userOrders);
                                                                    res.send({
                                                                        userOrders:
                                                                            userOrders,
                                                                        cart: cart,
                                                                        totalAmount:
                                                                            Math.round(
                                                                                totalAmount *
                                                                                    100
                                                                            ) /
                                                                            100,
                                                                        result: result,
                                                                        message:
                                                                            "Successfully logged in!",
                                                                    });
                                                                } else {
                                                                    console.log(
                                                                        "error!"
                                                                    );
                                                                }
                                                            }
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
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

module.exports.addOrder = async (req, response) => {
    const userCart = req.body.userCart;
    const userId = req.body.userId;
    const orderDate = new Date();
    const paidAmount = req.body.paidAmount;

    const sqlInsert =
        "INSERT INTO UserOrderItems (UserID, OrderItems, OrderDate, PaidAmount) VALUES (?,?,?,?)";
    db.query(
        sqlInsert,
        [userId, userCart, orderDate, paidAmount],
        (err, result) => {
            if (!err) {
                const sqlInsert =
                    "SELECT * FROM UserOrderItems WHERE UserID = ?";
                db.query(sqlInsert, [userId], (err, result) => {
                    if (!err) {
                        userOrders = result;
                        message = "success";
                        response.send({
                            message: message,
                            userOrders: userOrders,
                        });
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        }
    );
};

module.exports.logout = async (req, res) => {
    res.clearCookie("_random_cookie_name", {
        path: "/",
        domain: ".awesomedomain.co",
    }),
        res.clearCookie("userId").send();
};
