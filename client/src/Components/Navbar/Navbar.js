import React, { useState, useEffect, useCallback, Fragment } from "react";
import { ReactComponent as CloseMenu } from "./assets/x.svg";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "./assets/fever.png";
import Cart from "../../Pages/Cart/Cart";
import SearchModal from "../SeachModal/SearchModal";
import Button from "react-bootstrap/Button";

const Header = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => {
        console.log("it works!");

        setClick(!click);
    };
    const closeMobileMenu = () => {
        console.log("it works!");
        setClick(false);
    };

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = useCallback(async () => {
        // find current scroll position
        const currentScrollPos = window.pageYOffset;

        // set state based on location info (explained in more detail below)
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 0);

        // set state to new scroll position
        setPrevScrollPos(currentScrollPos);
    }, [prevScrollPos]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <div className={visible ? "header" : "header2"}>
            <div className="logo-nav">
                <Link to="/#" className="logo-nav-link">
                    <img
                        src={Logo}
                        className="nav-logo-component"
                        alt="website logo"
                    />
                </Link>
            </div>
            {click && (
                <ul className="nav-options active">
                    <li className="option" onClick={closeMobileMenu}>
                        <Link className="link" to="/#">
                            Home
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link className="link" to="/shop">
                            Shop
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link className="link" to="/about-us">
                            About Us
                        </Link>
                    </li>
                    <li className="option">
                        <Link className="link" to="#">
                            <SearchModal className="search_modal_btn" />
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link className="link" to="/my-account">
                            My Account
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Cart />
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link className="link" to="/contact-us">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            )}
            {!click && (
                <>
                    <ul className="nav-options">
                        <li className="option" onClick={closeMobileMenu}>
                            <Link className="link" to="/#">
                                <Button className="my_button" variant="primary">
                                    Home
                                </Button>
                            </Link>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <Link className="link" to="/shop">
                                <Button className="my_button" variant="primary">
                                    Shop
                                </Button>
                            </Link>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <Link className="link" to="/about-us">
                                <Button className="my_button" variant="primary">
                                    About Us
                                </Button>
                            </Link>
                        </li>
                    </ul>
                    <ul className="justify nav-options">
                        <li className="option" onClick={closeMobileMenu}>
                            <Link className="link" to="#">
                                <SearchModal />
                            </Link>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <Link className="link" to="/my-account">
                                <Button className="my_button" variant="primary">
                                    My Account
                                </Button>
                            </Link>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <Button
                                shadow-none
                                className="my_button"
                                variant="primary"
                            >
                                <Cart className="cart" />
                            </Button>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <Link className="link" to="/contact-us">
                                <Button className="my_button" variant="primary">
                                    Contact Us
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </>
            )}
            <div className="mobile-menu" onClick={handleClick}>
                {click ? (
                    <CloseMenu className="menu-icon" />
                ) : (
                    <MenuIcon className="menu-icon" />
                )}
            </div>
        </div>
    );
};

export default Header;
