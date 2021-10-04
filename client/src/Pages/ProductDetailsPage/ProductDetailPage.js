import React, { useState, useContext } from "react";
import "./ProductDetailPage.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CartContext from "../../ContextStore/cart-ctx";
import { Button } from "react-bootstrap";
import ProductsContext from "../../ContextStore/products-ctx";
const axios = require("axios").default;
axios.defaults.withCredentials = true;

const Product = ({ match }) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");

    const cartCtx = useContext(CartContext);
    const productsCtx = useContext(ProductsContext);

    const myFilteredProduct = productsCtx.products.filter((product) => {
        return product.id == match.params.id;
    });

    const submitHandler = () => {
        if (!size) {
            return;
        }

        //add item to frontend cart
        cartCtx.addItem({
            id: myFilteredProduct[0].id,
            image: myFilteredProduct[0].image,
            title: myFilteredProduct[0].title,
            price: myFilteredProduct[0].price,
            quantity: quantity,
            size: size,
        });
        //

        //add item to backend cart
        axios
            .post("http://localhost:3001/api/initialAdd", {
                id: myFilteredProduct[0].id,
                image: myFilteredProduct[0].image,
                title: myFilteredProduct[0].title,
                price: myFilteredProduct[0].price,
                quantity: quantity,
                size: size,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch(() => {
                console.log("did not send to backend!");
            });
        //
    };

    return (
        <>
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
                                            value={"X-Large"}
                                        >
                                            XL
                                        </option>
                                        <option
                                            className="productDetail__page__size__option"
                                            value={"XX-Large"}
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
                            <div onClick={submitHandler}>
                                <Button className="btn btn-success my-3">
                                    Add To Cart
                                </Button>
                            </div>
                            <Button className="btn btn-warning">Buy Now</Button>
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
