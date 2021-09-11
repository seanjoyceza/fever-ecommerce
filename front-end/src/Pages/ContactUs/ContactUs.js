import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ContactUs.css";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";

import { motion } from "framer-motion";
import Fade from "react-reveal/Fade";

function Contact() {
    //to load page at the top and not somewhere in the middle
    const routePath = useLocation();
    const onTop = () => {
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        onTop();
    }, [routePath]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="contact__page"
        >
            <div className="contact__page__wrapper">
                <div className="contact__page__details">
                    <h1>Contact</h1>
                    <div className="contact__page__details__text">
                        <p>We would love to hear from you!</p>
                    </div>
                    <div className="contact__page__details__form__holder">
                        <form
                            action="https://formsubmit.co/alex.stuart.thomson@gmail.com"
                            method="POST"
                            className="contact__form"
                        >
                            <input
                                type="hidden"
                                name="_cc"
                                value="info@unreal-nfts.com"
                            ></input>
                            <input
                                type="hidden"
                                name="_next"
                                value="http://unreal-nfts.com/thankyou"
                                // value='https://unreal-nft-s.vercel.app/thankyou'
                                // value='http://localhost:3000/thankyou'
                            ></input>
                            <input
                                type="hidden"
                                name="_subject"
                                value="New submission!"
                            ></input>
                            <input
                                type="hidden"
                                name="_captcha"
                                value="false"
                            ></input>

                            {/*-------------------------------------------------------------------------- */}
                            <Fade delay={200}>
                                <div className="input__wrapper">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        required
                                        className="contact__form__input"
                                    />
                                </div>
                            </Fade>

                            <Fade delay={300}>
                                <div className="input__wrapper">
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Enter Surname"
                                        required
                                        className="contact__form__input"
                                    />
                                </div>
                            </Fade>

                            <Fade delay={400}>
                                <div className="input__wrapper">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        className="contact__form__input"
                                    ></input>
                                </div>
                            </Fade>

                            <Fade delay={500}>
                                <div className="input__wrapper">
                                    <input
                                        type="phone"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        className="contact__form__input"
                                    ></input>
                                </div>
                            </Fade>

                            <Fade delay={600}>
                                <div className="input__wrapper">
                                    <textarea
                                        name="message"
                                        className="contact__form__input"
                                        id="textarea-input"
                                        placeholder="Your message..."
                                        id="message"
                                        required
                                    ></textarea>
                                </div>
                            </Fade>

                            <button
                                type="submit"
                                className="contact__form__submitButton"
                            >
                                Send
                            </button>
                        </form>
                    </div>

                    <div className="contact__page__details__socials">
                        <a href="">
                            <InstagramIcon className="social__logos" />
                        </a>
                        <a href="">
                            <FacebookIcon className="social__logos" />
                        </a>
                        <a href="">
                            <TelegramIcon className="social__logos" />
                        </a>
                    </div>
                    <div className="contact__page__details__location">
                        <LocationOnIcon className="location__icon" />
                        <p>Cape Town,</p>
                        <p>South Africa</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Contact;
