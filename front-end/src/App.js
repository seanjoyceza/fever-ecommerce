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
import ProductDetailPage from "./Components/ProductDetailsPage/ProductDetailPage";

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatePresence>
        <Switch>
          <Route path='/boards'>
            <Boards />
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
  );
}

export default App;
