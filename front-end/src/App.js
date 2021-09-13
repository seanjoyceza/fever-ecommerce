import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

//COMPONENTS
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home-Page/Home";
import AboutUs from "./Components/Pages/About-Us/AboutUs";
import Shop from "./Components/Pages/Shop/Shop";
import ContactUs from "./Components/Pages/ContactUs/ContactUs";
import Cart from "./Components/Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import MyAccount from "./Components/Pages/My-Account/MyAccount";
import Boards from "./Components/Pages/Secondary-Pages/Boards/Boards";
import ProductDetailPage from "./Components/ProductDetailsPage/ProductDetailPage";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";
import CartProvider from "./ContextStore/cart-provider";

function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <AnimatePresence>
                    <Switch>
                        <Route path="/boards">
                            <Boards />
                        </Route>
                        <Route exact path="/register">
                            <Register />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/about-us">
                            <AboutUs />
                        </Route>
                        <Route exact path="/contact-us">
                            <ContactUs />
                        </Route>
                        <Route exact path="/my-account">
                            <MyAccount />
                        </Route>
                        <Route exact path="/cart">
                            <Cart />
                        </Route>
                        {/*THESE 2 COMPONENTS ARE RENDERED DIFFERENTLY TO GET THE CUSTOM PAGE ROUTING TO WORK. AN ERROR OCCURS WHEN IT HAS THE SAME LAYOUT AS THE OTHER */}
                        <Route
                            exact
                            path="/shop/:id"
                            component={ProductDetailPage}
                        />
                        <Route exact path="/shop" component={Shop} />

                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </AnimatePresence>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;
