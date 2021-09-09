import React, {  useState } from "react";
import "./Home.css";
import { motion } from "framer-motion";


import MainLinks from './MainLinks/MainLinks'

//components

  

function Home() {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="home__page"
        >
      
            {/*      <FeaturedProducts />
             */}
            <MainLinks />
        </motion.div>
    );
}

export default Home;
