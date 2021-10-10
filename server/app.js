const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 3001;
require("dotenv").config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { validationResult, check } = require("express-validator");
const userRoutes = require("./routes/user");
const showRoute = require("./routes/show");

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

//routes
app.use("/", userRoutes);
app.use("/", showRoute);
// end middleware

//get products
// const db = mysql.createPool({
//     host: process.env.DB_URL,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// });

// app.get("/api/get", async (req, res) => {
//     db.query("SELECT * from products", (err, rows) => {
//         if (!err) {
//             res.send(rows);
//         } else {
//             console.log(err);
//         }
//     });
// });
//end get products

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
                // console.log("not found!");
                const sqlInsert =
                    "INSERT INTO UserCartItems (UserID, ProductID, Quantity, Size) VALUES (?,?,?,?)";
                db.query(
                    sqlInsert,
                    [userId, productId, quantity, size],
                    (err, result) => {
                        if (!err) {
                            message = "success";
                            // console.log(message);
                            response.send(message);
                        } else {
                            console.log(err);
                        }
                    }
                );
            } else {
                // console.log("found!");
                const sqlInsert =
                    "UPDATE UserCartItems SET Quantity = Quantity + quantity WHERE (UserID = userId AND ProductID = productId AND Size = size)";
                db.query(
                    sqlInsert,
                    // [quantity, userId, productId, size],
                    (err, result) => {
                        if (!err) {
                            message = "success";
                            // console.log(message);
                            response.send(message);
                        } else {
                            console.log(err);
                        }
                    }
                );
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

//listen on env port or port 3001
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
