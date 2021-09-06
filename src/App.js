import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//COMPONENTS
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home-Page/Home";

function App() {
  return (
    <Router>
      <AnimatePresence>
        <Switch>
      

          <Route path='/'>
           <Navbar />
            <Home />
          </Route>
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
