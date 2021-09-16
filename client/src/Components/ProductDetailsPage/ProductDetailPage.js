import React, { useState, useEffect, useContext } from "react";
import "./ProductDetailPage.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CartContext from "../../ContextStore/cart-ctx";
import axios from "axios";
import { Button } from "react-bootstrap";

const Product = ({ match }) => {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");

    const cartCtx = useContext(CartContext);

    useEffect(() => {
        fetchProduct();
        // console.log("uf", size);
    }, []);

    const fetchProduct = () => {
        axios
            .get(`https://fakestoreapi.com/products/${match.params.id}`)
            .then((res) => {
                setProduct(res.data);
                // console.log(res.data);
            })
            .catch((err) => console.log(err));
    };

    const submitHandler = (event) => {
        if (!size) {
            return;
        }

        cartCtx.addItem({
            //remember to change this ID to a more comprehensive one
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
        });
    };

    return (
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
                        src={product.image}
                        alt="product"
                    />
                </div>
                <div className="productDetail__page__text">
                    <h2 className="productDetail__page__title">
                        {product.title}
                    </h2>
                    <h3 className="productDetail__page__price">
                        R{product.price}
                    </h3>
                    <p className="productDetail__page__description">
                        {product.description}
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
                                onChange={(e) => setSize(e.target.value)}
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
                                {quantity < 1 ? setQuantity(1) : quantity}
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
    );
};
export default Product;
