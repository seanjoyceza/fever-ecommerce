import React from "react";
import "./PageHeader.css";
import { motion } from "framer-motion";

function PageHeader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="pageheader">
                <div className="pageheader__top">
                    <div className="pageheader__top-left">
                        <div className="pageheader__slogan">
                            <a className="pageheader__slogan__logout" href="/#">
                                Logout
                            </a>
                            <p className="pageheader__slogan__title">
                                My Account
                            </p>
                            <p className="pageheader__slogan__greeting">
                                Welcome Back, Sean!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default PageHeader;
