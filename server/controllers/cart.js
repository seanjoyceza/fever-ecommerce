const mysql = require("mysql");

const db = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

module.exports.addToCart = async (req, response) => {
    const userId = req.body.userId;
    const productId = parseInt(req.body.productId);
    const quantity = req.body.quantity;
    const size = req.body.size.substring(0, 2);
    console.log(`id is: ${productId}`);

    db.query(
        "SELECT * FROM UserCartItems WHERE (UserID = ? AND ProductID = ? AND Size = ?)",
        [userId, productId, size],
        (err, res) => {
            if (err) {
                console.log("error");
            }
            console.log(res);
            if (res.length === 0) {
                console.log("not found!");
                const sqlInsert =
                    "INSERT INTO UserCartItems (UserID, ProductID, Quantity, Size) VALUES (?,?,?,?)";
                db.query(
                    sqlInsert,
                    [userId, productId, quantity, size],
                    (err, result) => {
                        if (!err) {
                            message = "success";
                            response.send(message);
                        } else {
                            console.log(err);
                        }
                    }
                );
            } else {
                console.log("found!");
                const sqlInsert =
                    "UPDATE UserCartItems SET Quantity = Quantity + ? WHERE (UserID = ? AND ProductID = ? AND Size = ?)";
                db.query(
                    sqlInsert,
                    [quantity, userId, productId, size],
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
};

module.exports.updateCartItem = async (req, res) => {
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
};
