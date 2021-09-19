const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 3001;
require("dotenv").config();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//start mySQL
const db = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.get("/api/get", (req, res) => {
    db.query("SELECT * from products", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

//started setting up register backend logic
app.get("/api/register", (req, res) => {
    db.query("SELECT * from products", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});
//end mySQL

//listen on env port or port 3001
app.listen(port, () => {
    console.log("Serving on port 3001");
});
