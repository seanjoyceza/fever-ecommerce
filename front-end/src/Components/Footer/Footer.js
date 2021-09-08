import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer__top">
                <div className="footer__top-left">
                    <div className="footer__slogan">
                        <h1>The Future Is Now </h1>
                    </div>
                    <div className="footer__logo-holder">
                        <div className="footer__logo">
                            <svg
                                className="svg-logo"
                                width="107"
                                height="107"
                                viewBox="0 0 107 107"
                                fill=""
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M70.065 6.52499L65.325 11.265L61.425 7.36498C60.715 6.65498 59.635 6.43498 58.705 6.82498C57.775 7.21498 57.165 8.11499 57.165 9.12499V21.035C57.165 22.415 58.285 23.525 59.655 23.525H71.565C72.235 23.525 72.865 23.255 73.325 22.795C73.555 22.565 73.735 22.295 73.865 21.985C74.255 21.055 74.035 19.985 73.325 19.265L69.425 15.365L74.165 10.625C80.125 4.66499 89.815 4.66499 95.765 10.625C101.725 16.585 101.725 26.275 95.765 32.225L61.275 66.715C60.135 67.855 60.135 69.695 61.275 70.825C62.415 71.965 64.255 71.965 65.385 70.825L99.875 36.335C108.095 28.115 108.095 14.725 99.875 6.50498C91.675 -1.69502 78.295 -1.69501 70.065 6.52499Z"
                                    fill="#F7F7F7"
                                />
                                <path
                                    d="M35.975 100.385L40.715 95.645L44.615 99.545C45.325 100.255 46.405 100.475 47.335 100.085C48.265 99.695 48.875 98.795 48.875 97.785V85.875C48.875 84.495 47.755 83.385 46.385 83.385H34.475C33.805 83.385 33.175 83.655 32.715 84.115C32.485 84.345 32.305 84.615 32.175 84.925C31.785 85.855 32.005 86.925 32.715 87.645L36.615 91.545L31.875 96.285C25.915 102.245 16.225 102.245 10.275 96.285C4.315 90.325 4.315 80.635 10.275 74.685L44.765 40.195C45.905 39.055 45.905 37.215 44.765 36.085C43.625 34.945 41.785 34.945 40.655 36.085L6.165 70.575C-2.055 78.795 -2.055 92.185 6.165 100.405C14.365 108.605 27.745 108.605 35.975 100.385Z"
                                    fill="#F7F7F7"
                                />
                                <path
                                    d="M99.945 70.505L95.205 65.765L99.105 61.865C99.815 61.155 100.035 60.075 99.645 59.145C99.255 58.215 98.355 57.605 97.345 57.605H85.435C84.055 57.605 82.945 58.725 82.945 60.095V72.005C82.945 72.675 83.215 73.305 83.675 73.765C83.905 73.995 84.175 74.175 84.485 74.305C85.415 74.695 86.485 74.475 87.205 73.765L91.105 69.865L95.845 74.605C101.805 80.565 101.805 90.255 95.845 96.205C89.885 102.165 80.195 102.165 74.245 96.205L39.755 61.715C38.615 60.575 36.775 60.575 35.645 61.715C34.505 62.855 34.505 64.695 35.645 65.825L70.135 100.315C78.355 108.535 91.745 108.535 99.965 100.315C108.185 92.095 108.175 78.725 99.945 70.505Z"
                                    fill="#F7F7F7"
                                />
                                <path
                                    d="M6.50497 35.995L11.245 40.735L7.34496 44.635C6.63496 45.345 6.41496 46.425 6.80496 47.355C7.19496 48.285 8.09496 48.895 9.10496 48.895H21.015C22.395 48.895 23.505 47.775 23.505 46.405V34.475C23.505 33.805 23.235 33.175 22.775 32.715C22.545 32.485 22.275 32.305 21.965 32.175C21.035 31.785 19.965 32.005 19.245 32.715L15.345 36.615L10.605 31.875C4.64496 25.915 4.64496 16.225 10.605 10.275C16.565 4.31499 26.255 4.31499 32.205 10.275L66.695 44.765C67.835 45.905 69.675 45.905 70.805 44.765C71.945 43.625 71.945 41.785 70.805 40.655L36.315 6.165C28.095 -2.055 14.705 -2.055 6.48496 6.165C-1.73504 14.385 -1.71503 27.765 6.50497 35.995Z"
                                    fill="#F7F7F7"
                                />
                            </svg>
                        </div>

                        <div className="footer__follow">
                            <h3>Follow Us</h3>
                            <Link></Link>
                        </div>
                    </div>
                </div>
                <div className="footer__top-right">
                    <div className="footer__links-holder-right">
                        <div className="footer__links-holder">
                            <h3> MERGE-IoT</h3>
                            <ul className="footer__list">
                                <li className="footer__option">
                                    <Link className="footer__link" to="about">
                                        About
                                    </Link>
                                </li>
                                <li className=" footer__option">
                                    <Link
                                        className="footer__link"
                                        to="services"
                                    >
                                        Services
                                    </Link>
                                </li>
                                <li className="footer__option">
                                    <Link
                                        className="footer__link"
                                        to="solutions"
                                    >
                                        Solutions
                                    </Link>
                                </li>

                                <li className="footer__option">
                                    <Link
                                        className="footer__link"
                                        to="partners"
                                    >
                                        Partners
                                    </Link>
                                </li>
                                <li className="footer__option">
                                    <Link className="footer__link" to="contact">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__contact-holder">
                            <h3 className="footer__contact-header">
                                Get In Touch{" "}
                            </h3>
                            <div className="footer__contact-email">
                                <p>test@test.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom-line"></div>

            <div className="footer__bottom">
                <div className="footer__bottom-section">
                    <div className="footer_one">
                        <p>© 2021 MERGE-IoT®</p>
                    </div>
                    <div className="footer_two">
                        <a
                            href="https://www.normanlly.com/"
                            className="normanlly__link"
                        >
                            {" "}
                            <p className="normanlly__link__text">
                                Created by Normanlly
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
