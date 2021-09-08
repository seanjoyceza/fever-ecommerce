import React from "react";
import "./Home.css";

//components
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

function Home() {
    return (
        <div className="home__page">
            <FeaturedProducts />
        </div>
    );
}

export default Home;
