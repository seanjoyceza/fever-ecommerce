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
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //"HARRY NOTES:" I had to add the "http://localhost:3000" in place of the star as i was getting CORS errors. (see error at the bottom of the page)
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

//---------STRIPE PAYMENT---------------
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST) <-----  HARRY: USE THIS ONE WHEN YOU GET .ENV FILE
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

// app.post("/post", cors(), async (req, res) => {
//     let { amount, id } = req.body;
//     try {
//         const payment = await stripe.paymentIntents.create({
//             amount,
//             currency: "ZAR",
//             description: "Fever Ecommerce",
//             payment_method: id,
//             confirm: true,
//         });
//         console.log("Payment", payment);
//         res.json({
//             message: "Payment successful",
//             success: true,
//         });
//     } catch (error) {
//         console.log("Error", error);
//         res.json({
//             message: "Payment failed",
//             success: false,
//         });
//     }
// });

//HARRY CORS ERRORS: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
