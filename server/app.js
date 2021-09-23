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
app.post("/api/register", async (req, res) => {
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    db.query(
        "SELECT * FROM users WHERE UserEmail = ?",
        userEmail,
        (err, result) => {
            if (result.length > 0) {
                // res.send();
                res.send("email already exists!");
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
                                res.send("Success!");
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

app.post("/api/login", async (req, res) => {
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
                            // console.log(req.session.user);
                            req.flash("success", "Logged in!");
                            res.send({
                                result: result,
                                messages: req.flash("success"),
                            });
                        } else {
                            res.send({
                                message: "Wrong email or password combination!",
                            });
                        }
                    }
                );
            } else {
                res.send({ message: "Wrong email or password combination!" });
            }
        }
    );
});
//end login

//logout
app.get("/api/logout", async (req, res) => {
    res.clearCookie("userId").send();
});
//end logout

//listen on env port or port 3001
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
