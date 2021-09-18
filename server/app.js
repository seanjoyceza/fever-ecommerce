const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//start mySQL
const db = mysql.createPool({
    host: "dedi648.jnb3.host-h.net",
    user: "feverboardsDB",
    password: "VWl27JrtYmTMy3ycWH8R",
    database: "feverboardsDB",
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
