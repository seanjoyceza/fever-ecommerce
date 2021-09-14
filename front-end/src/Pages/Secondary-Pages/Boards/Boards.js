import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Boards.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import loadingSpinner from "../../../Components/assets/loading-buffering.gif";

function Boards() {
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    //SEARCH FUNCTION
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );
    const searchProducts = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = () => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="boards__page"
        >
            <form className="product__search">
                <input
                    type="text"
                    placeholder="Search for a product"
                    className="product__search__input"
                    onChange={searchProducts}
                />
            </form>
            <div className="shop__page__display">
                <div className="shop__page__product_holder">
                    {filteredProducts ? (
                        filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                className="product_card_link"
                                to={`/shop/${product.id}`}
                            >
                                <ProductCard
                                    // title={product.brand}
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                />
                            </Link>
                        ))
                    ) : (
                        <img src={loadingSpinner} alt="item" />
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default Boards;
