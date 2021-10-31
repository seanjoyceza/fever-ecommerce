import React, { useState, useContext, useEffect } from "react";
import "./ProductDetailPage.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CartContext from "../../ContextStore/cart-ctx";
import { Button } from "react-bootstrap";
import ProductsContext from "../../ContextStore/products-ctx";
import AuthContext from "../../ContextStore/auth-ctx";
import { useHistory } from "react-router-dom";
import Flash from "../../Components/Flash/Flash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
const axios = require("axios").default;

axios.defaults.withCredentials = true;

const Product = ({ match }) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(null);
    const [flash, setFlash] = useState(false);
    const [flashMessage, setFlashMessage] = useState("");
    const [flashVariant, setFlashVariant] = useState("");

    const cartCtx = useContext(CartContext);
    const productsCtx = useContext(ProductsContext);
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const myFilteredProduct = productsCtx.products.filter((product) => {
        return product.id == match.params.id;
    });

    const submitHandler = () => {
        if (!size) {
            setFlashVariant("danger");
            setFlashMessage("You need to select a size!");
            setFlash(true);
            return;
        }

        if (!authCtx.isLoggedIn) {
            setFlashVariant("danger");
            setFlashMessage("You need to log in first!");
            setFlash(true);
            return;
            // history.push("/login");
            // const message = "You need to log in first!";
            // const timer = setTimeout(() => {
            //     window.alert(message);
            // }, 200);
            // return () => clearTimeout(timer);
        }

        //add item to cart
        // console.log(myFilteredProduct[0].price);
        if (authCtx.isLoggedIn) {
            //backend cart
            axios
                .post("http://localhost:3001/api/addToCart", {
                    productId: myFilteredProduct[0].id,
                    userId: authCtx.isLoggedIn,
                    quantity: quantity,
                    size: size,
                })

                .then((res) => {
                    if (res.data === "success") {
                        //frontend cart
                        cartCtx.addItem({
                            id: myFilteredProduct[0].id,
                            image: myFilteredProduct[0].image,
                            title: myFilteredProduct[0].title,
                            price: myFilteredProduct[0].price,
                            quantity: quantity,
                            size: size,
                        });
                        // console.log(size);
                    }
                })
                .catch(() => {
                    console.log("did not send to backend!");
                });
        }
        //
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFlashMessage("");
            setFlash(false);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Container className="text-center d-flex justify-content-center">
                <Row>
                    <Col>
                        {flash && (
                            <Flash
                                message={flashMessage}
                                variant={flashVariant}
                            />
                        )}
                    </Col>
                </Row>
            </Container>

            {productsCtx.products.length > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="productDetail__page"
                >
                    <div className="productDetail__page__details">
                        <div className="productDetail__page__image__holder">
                            <img
                                className="productDetail__page__image"
                                src={myFilteredProduct[0].image}
                                alt="product"
                            />
                        </div>
                        <div className="productDetail__page__text">
                            <h2 className="productDetail__page__title">
                                {myFilteredProduct[0].title}
                            </h2>
                            <h3 className="productDetail__page__price">
                                R{myFilteredProduct[0].price}
                            </h3>
                            <p className="productDetail__page__description">
                                {myFilteredProduct[0].ProductLongDesc}
                            </p>
                            <div>
                                {size && (
                                    <label className="label">
                                        Size: <b>{size}</b>
                                    </label>
                                )}
                                <div className="productDetail__page__select_size">
                                    <select
                                        className="productDetail__page__size"
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                        required
                                    >
                                        <option
                                            className="productDetail__page__size__option"
                                            value={""}
                                        >
                                            Select a size
                                        </option>
                                        <option
                                            className="productDetail__page__size__option"
                                            value={"Small"}
                                        >
                                            Small
                                        </option>
                                        <option
                                            className="productDetail__page__size__option"
                                            value={"Medium"}
                                        >
                                            Medium
                                        </option>
                                        <option
                                            className="productDetail__page__size__option"
                                            value={"Large"}
                                        >
                                            Large
                                        </option>
                                        <option
                                            className="productDetail__page__size__option"
                                            value={"XLarge"}
                                        >
                                            XL
                                        </option>
                                        <option
                                            className="productDetail__page__size__option"
                                            value={"XXLarge"}
                                        >
                                            XXL
                                        </option>
                                    </select>
                                </div>
                                <label className="label">Quantity:</label>
                                <div className="quantity__select">
                                    <button
                                        className="quantity__button button"
                                        onClick={() => {
                                            setQuantity(quantity - 1);
                                        }}
                                    >
                                        -
                                    </button>
                                    <div className="quantity__display">
                                        {quantity < 1
                                            ? setQuantity(1)
                                            : quantity}
                                    </div>
                                    <button
                                        className="quantity__button button"
                                        onClick={() => {
                                            setQuantity(quantity + 1);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <Button
                                    onClick={submitHandler}
                                    className="btn btn-success my-3"
                                >
                                    Add To Cart
                                </Button>
                            </div>
                            {/* <Button className="btn btn-warning">Buy Now</Button> */}
                        </div>
                    </div>

                    <div>
                        <Link className="btn btn-danger" to="/shop">
                            Back to shop
                        </Link>
                    </div>
                </motion.div>
            )}
        </>
    );
};
export default Product;
