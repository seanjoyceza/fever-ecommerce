import React from "react";
import "./PageHeader.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
                            <Link className="pageheader__slogan__logout" to="/login">
                                Logout
                            </Link>
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
