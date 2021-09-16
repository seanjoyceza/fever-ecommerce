import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

const SideBar = (props) => {
    return (
        <>
            <div className="sidebar">
                <div className="search-items">
                    <h3 className="search_heading">PRODUCT CATEGORIES</h3>
                    <Link className="sidebar_links" to="/boards">
                        Boards
                    </Link>
                    <Link className="sidebar_links" to="/socks">
                        Socks
                    </Link>
                    <Link className="sidebar_links" to="/bandanas">
                        Bandanas
                    </Link>
                    <Link className="sidebar_links" to="/stickers">
                        Stickers
                    </Link>
                    <Link className="sidebar_links" to="/clothing">
                        Clothing
                    </Link>
                    <Link className="sidebar_links" to="/masks">
                        Masks
                    </Link>
                    <Link className="sidebar_links" to="/mugs">
                        Cofee Mugs
                    </Link>
                </div>

                <div className="search">
                    <h3 className="search_heading">SEARCH...</h3>
                    <form className="product__search">
                        <input
                            type="text"
                            placeholder="Search"
                            className="sidebar_product__search__input"
                            onChange={props.searchProducts}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default SideBar;
