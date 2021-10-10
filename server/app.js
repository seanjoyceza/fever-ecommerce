const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 3001;
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const userRoutes = require("./routes/user");
const showRoute = require("./routes/show");
const cartRoute = require("./routes/cart");

const db = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

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
app.use("/", cartRoute);
// end middleware

//listen on env port or port 3001
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
