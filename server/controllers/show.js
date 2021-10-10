const mysql = require("mysql");

const db = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

module.exports.get = async (req, res) => {
    db.query("SELECT * from products", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
};
