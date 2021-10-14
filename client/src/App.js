import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

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
import ProductDetailPage from "./Components/ProductDetailsPage/ProductDetailPage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CartProvider from "./ContextStore/cart-provider";
import PrivacyPolicy from "./Pages/Policy-Pages/PrivacyPolicy";
import ShippingPolicy from "./Pages/Policy-Pages/ShippingPolicy";
import ReturnsPolicy from "./Pages/Policy-Pages/ReturnsPolicy";
import Bandanas from "./Pages/Secondary-Pages/Bandanas/Bandanas";
import Socks from "./Pages/Secondary-Pages/Socks/Socks";
import Stickers from "./Pages/Secondary-Pages/Stickers/Stickers";
import Clothing from "./Pages/Secondary-Pages/Clothing/Clothing";
import Masks from "./Pages/Secondary-Pages/Masks/Masks";
import Mugs from "./Pages/Secondary-Pages/Mugs/Mugs";
import AuthProvider from "./ContextStore/auth-provider";
import Checkout from "./Pages/Checkout/Checkout";
import PaymentPage from "./Pages/Payment/PaymentPage";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <AnimatePresence>
            <Switch>
              <Route path='/boards'>
                <Boards />
              </Route>
              <Route path='/socks'>
                <Socks />
              </Route>
              <Route path='/bandanas'>
                <Bandanas />
              </Route>
              <Route path='/stickers'>
                <Stickers />
              </Route>
              <Route path='/clothing'>
                <Clothing />
              </Route>
              <Route path='/masks'>
                <Masks />
              </Route>
              <Route path='/mugs'>
                <Mugs />
              </Route>
              <Route exact path='/policy/shipping-policy'>
                <ShippingPolicy />
              </Route>
              <Route exact path='/checkout'>
                <Checkout />
              </Route>
              <Route exact path='/payment-page'>
                <PaymentPage />
              </Route>
              <Route exact path='/policy/privacy-policy'>
                <PrivacyPolicy />
              </Route>
              <Route exact path='/policy/return-policy'>
                <ReturnsPolicy />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/about-us'>
                <AboutUs />
              </Route>
              <Route exact path='/contact-us'>
                <ContactUs />
              </Route>
              <Route exact path='/my-account'>
                <MyAccount />
              </Route>
              <Route exact path='/cart'>
                <Cart />
              </Route>
              {/*THESE 2 COMPONENTS ARE RENDERED DIFFERENTLY TO GET THE CUSTOM PAGE ROUTING TO WORK. AN ERROR OCCURS WHEN IT HAS THE SAME LAYOUT AS THE OTHER */}
              <Route exact path='/shop/:id' component={ProductDetailPage} />
              <Route exact path='/shop' component={Shop} />

              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>
          </AnimatePresence>
          <Footer />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
