const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 3001;
require("dotenv").config();
const router = express.Router();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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
    const sqlInsert =
        "INSERT INTO users (userFirstName, userLastName,userEmail, userPassword) VALUES (?,?,?,?)";
    db.query(
        sqlInsert,
        [userFirstName, userLastName, userEmail, userPassword],
        (err, result) => {
            if (!err) {
                res.send("Success!");
            } else {
                console.log(err);
            }
        }
    );
});
//end register

//listen on env port or port 3001
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
