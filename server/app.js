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

app.get("/api/get", async (req, res) => {
    db.query("SELECT * from products", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

app.post("/api/register", async (req, res) => {
    const userFirstName = req.body.userFirstName;
    const userLastName = req.body.userLastName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

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
//end mySQL

//custom error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
//

//listen on env port or port 3001
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
