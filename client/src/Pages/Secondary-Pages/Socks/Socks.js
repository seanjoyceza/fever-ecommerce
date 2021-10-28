import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./Socks.css";
import { Link } from "react-router-dom";
// import axios from "axios";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import loadingSpinner from "../../../Components/assets/loading-buffering.gif";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../../../Components/SideBar/SideBar";
import ProductsContext from "../../../ContextStore/products-ctx";

function Socks() {
    const [search, setSearch] = useState("");

    const productsCtx = useContext(ProductsContext);

    //SEARCH FUNCTION
    const filteredProducts = productsCtx.products.filter(
        (product) => product.ProductCategoryID === 2
    );
    const searchProducts = (event) => {
        setSearch(event.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="socks__page"
        >
            <Container>
                <Row>
                    <Col xs={3} className="mt-4 sidebar-col">
                        <SideBar searchProducts={searchProducts} />
                    </Col>
                    <Col>
                        <div className="shop__page__display">
                            <div className="shop_page_heading">Socks</div>
                           {/** 
                            <div className="shop_page_heading2">
                                <div className="sort_by">Sort by:</div>
                                <select className="shop_page_select">
                                    <option
                                        className="shop_page_option"
                                        defaultValue={"Default sorting"}
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
                            */}

                            <div className="shop__page__product_holder">
                                {filteredProducts ? (
                                    filteredProducts
                                        .slice(0, 10)
                                        .map((product) => (
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
}

export default Socks;
