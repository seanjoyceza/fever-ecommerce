import React, { useState, useEffect } from "react";
import "./Shop.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import loadingSpinner from "../../Components/assets/loading-buffering.gif";
import SideBar from "../../Components/SideBar/SideBar";
import { Container, Row, Col } from "react-bootstrap";

const FeaturedProducts = () => {
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
            className="shop__page"
        >
            {/* <form className="product__search">
                <input
                    type="text"
                    placeholder="Search for a product"
                    className="product__search__input"
                    onChange={searchProducts}
                />
            </form> */}
            <Container>
                <Row>
                    <Col xs={3} className="mt-4 sidebar-col">
                        <SideBar searchProducts={searchProducts} />
                    </Col>
                    <Col>
                        <div className="shop__page__display">
                            <div className="shop_page_heading">
                                All Products
                            </div>
                            <div className="shop_page_heading2">
                                <div className="sort_by">Sort by:</div>
                                <select className="shop_page_select">
                                    <option
                                        className="shop_page_option"
                                        value={"Default sorting"}
                                        selected
                                    >
                                        Default sorting
                                    </option>
                                    <option
                                        className="shop_page_option"
                                        value={"Sort by latest"}
                                    >
                                        Sort by latest
                                    </option>
                                    <option
                                        className="shop_page_option"
                                        value={"Sort by price: low to high"}
                                    >
                                        Sort by price: low to high
                                    </option>
                                    <option
                                        className="shop_page_option"
                                        value={"Sort by price: high to low"}
                                    >
                                        Sort by price: high to low
                                    </option>
                                </select>
                            </div>

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
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
};
export default FeaturedProducts;
