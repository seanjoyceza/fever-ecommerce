import React, { useState, useEffect } from "react";
import ProductsContext from "./products-ctx";

const axios = require("axios").default;

const ProductsProvider = (props) => {
    const [products, setProducts] = useState([]);
    const fetchProducts = () => {
        axios
            .get("http://localhost:3001/api/get")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(`This is the error: ${err}`);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const productsContext = {
        products: products,
    };
    return (
        <ProductsContext.Provider value={productsContext}>
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
