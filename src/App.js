import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//COMPONENTS
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home-Page/Home";
import AboutUs from "./Pages/About-Us/AboutUs";

function App() {
    return (
        <Router>
            <Navbar />
            <AnimatePresence>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about-us">
                        <AboutUs />
                    </Route>
                </Switch>
            </AnimatePresence>
        </Router>
    );
}

export default App;
