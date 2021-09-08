import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//COMPONENTS
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home-Page/Home";
import AboutUs from "./Pages/About-Us/AboutUs";
import Shop from "./Pages/Shop/Shop";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Cart from "./Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import MyAccount from "./Pages/My-Account/MyAccount";
import Boards from "./Pages/Secondary-Pages/Boards/Boards";

function App() {
    return (
        <Router>
            <Navbar />
            <AnimatePresence>
                <Switch>
                    <Route exact path="/">
                        <Home />
                      <Footer />
                    </Route>
                    <Route path="/boards">
                        <Boards />
                    </Route>
                    <Route path="/shop">
                        <Shop />
                    </Route>
                    <Route path="/about-us">
                        <AboutUs />
                    </Route>
                    <Route path="/contact-us">
                        <ContactUs />
                    </Route>
                    <Route path="/my-account">
                        <MyAccount />
                    </Route>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                </Switch>
            </AnimatePresence>
            
        </Router>
    );
}

export default App;
