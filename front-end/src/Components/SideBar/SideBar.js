import React from "react";
import "./SideBar.css";

const SideBar = () => {
    return (
        <>
            <div class="sidebar">
                <a class="active" href="#home">
                    Home
                </a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
        </>
    );
};

export default SideBar;
