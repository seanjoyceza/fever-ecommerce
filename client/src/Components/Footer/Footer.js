import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

// import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
// import TelegramIcon from "@material-ui/icons/Telegram";

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__top'>
        <div className='footer__top-left'>
          <div className='footer__slogan'>
            <p className='footer__slogan__title'>About Fever Boards</p>
            <p>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
          </div>
          <div className='footer__logo-holder'>
            <div className='footer__logo'></div>

            <div className='footer__follow'>
              <h3>Follow Us</h3>
              <div className='footer__follow__links'>
                <Link to='/#'>
                  <FacebookIcon className='social__logo' />
                </Link>
                <Link to='/#'>
                  <FacebookIcon className='social__logo' />
                </Link>
                <Link to='/#'>
                  <FacebookIcon className='social__logo' />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='footer__top-right'>
          <div className='footer__links-holder-right'>
            <div className='footer__links-holder'>
              <h3> Fever Boards</h3>
              <ul className='footer__list'>
                <li className='footer__option'>
                  <Link className='footer__link' to='/about-us'>
                    About
                  </Link>
                </li>
                <li className=' footer__option'>
                  <Link className='footer__link' to='/shop'>
                    Shop
                  </Link>
                </li>
                <li className='footer__option'>
                  <Link className='footer__link' to='my-account'>
                    My Account
                  </Link>
                </li>
                {/* 
                <li className='footer__option'>
                  <Link className='footer__link' to='cart'>
                    Cart
                  </Link>
                </li>*/}
                <li className='footer__option'>
                  <Link className='footer__link' to='contact-us'>
                    Contact
                  </Link>
                </li>

                <li className='footer__option'>
                  <Link className='footer__link' to='/policy/privacy-policy'>
                    Privacy Policy
                  </Link>
                </li>
                <li className='footer__option'>
                  <Link className='footer__link' to='/policy/return-policy'>
                    Returns Policy
                  </Link>
                </li>
                <li className='footer__option'>
                  <Link className='footer__link' to='/policy/shipping-policy'>
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className='footer__contact-holder'>
              <h3 className='footer__contact-header'>Get In Touch</h3>
              <div className='footer__contact-email'>
                <p>test@test.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='footer__bottom-line'></div>

      <div className='footer__bottom'>
        <div className='footer__bottom-section'>
          <div className='footer_one'>
            <p>© 2021 Fever Boards®</p>
          </div>
          <div className='footer_two'>
            <a href='https://www.normanlly.com/' className='normanlly__link'>
              <p className='normanlly__link__text'>Created by Normanlly</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
