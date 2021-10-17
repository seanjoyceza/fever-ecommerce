const mysql = require("mysql");

const db = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

module.exports.addToCart = async (req, response) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const size = req.body.size;

    console.log(userId);
    console.log(productId);
    console.log(quantity);
    console.log(size);

    db.query(
        "SELECT * FROM UserCartItems WHERE UserID = userId AND ProductID = productId AND Size = size",
        // [userId, productId, size],
        (err, res) => {
            console.log(res);
            if (err) {
                console.log("error");
            }
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
                            // console.log(message);
                            response.send(message);
                        } else {
                            console.log(err);
                        }
                    }
                );
            } else {
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
