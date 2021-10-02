import React, { useState, useEffect } from "react";
import ProductsContext from "./products-ctx";

const axios = require("axios").default;

const ProductsProvider = (props) => {
    const [products, setProducts] = useState([]);
    const fetchProducts = () => {
        axios
            .get("http://localhost:3001/api/get")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(`This is the error: ${err}`);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // if (products[0]) {
    //     console.log(`Category is: ${products[0].ProductCategoryID}`);
    // }

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //         setIsLoggedIn(loggedInUser);
    //     }
    // }, []);

    // const setIsLoggedInHandler = (user) => {
    //     setIsLoggedIn(user);
    // };

    // const setIsLoggedOutHandler = () => {
    //     axios
    //         .post(
    //             "http://localhost:3001/api/logout",
    //             { redentials: "same-origin" },
    //             { withCredentials: true }
    //         )
    //         .catch(() => {
    //             console.log("Could not log out!");
    //         });
    //     localStorage.clear();
    //     setIsLoggedIn("");
    // };

    const productsContext = {
        products: products,
        //     setIsLoggedOut: setIsLoggedOutHandler,
        //     setIsLoggedIn: setIsLoggedInHandler,
    };
    return (
        <ProductsContext.Provider value={productsContext}>
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
