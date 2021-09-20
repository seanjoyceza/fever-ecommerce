import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ContactUs.css";
import ContactUsForm from "./ContactUsForm";

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
                        <ContactUsForm />
                    </div>

                    <div className="contact__page__details__socials">
                        <a href="/#">
                            <InstagramIcon className="social__logos" />
                        </a>
                        <a href="/#">
                            <FacebookIcon className="social__logos" />
                        </a>
                        <a href="/#">
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
