import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as CloseMenu } from "./assets/x.svg";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/FEVER.svg";

const Header = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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
                <Link to="/" className="logo-nav-link">
                    <Logo className="nav-logo-component" alt="website logo" />
                </Link>
            </div>
            <ul className={click ? "nav-options active" : "nav-options"}>
                <li className="option" onClick={closeMobileMenu}>
                    <Link className="link" to="/">
                        Home
                    </Link>
                </li>
                <li className="option" onClick={closeMobileMenu}>
                    <Link className="link" to="shop">
                        Shop
                    </Link>
                </li>
                <li className="option" onClick={closeMobileMenu}>
                    <Link className="link" to="about-us">
                        About Us
                    </Link>
                </li>
            </ul>

            <ul
                className={
                    click ? "justify nav-options active" : "justify nav-options"
                }
            >
                <li className="option" onClick={closeMobileMenu}>
                    <Link className="link" to="cart">
                        Cart(0)
                    </Link>
                </li>
                <li className="option" onClick={closeMobileMenu}>
                    <Link className="link" to="contact-us">
                        Contact Us
                    </Link>
                </li>
            </ul>

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