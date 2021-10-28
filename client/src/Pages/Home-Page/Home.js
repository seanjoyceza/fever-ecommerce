import React from "react";
import "./Home.css";
import { motion } from "framer-motion";
import { Container, Row } from "react-bootstrap";

import MainLinks from "./MainLinks/MainLinks";

//components

function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="home__page"
        >
            <Container fluid="lg">
                <Row>
                    <MainLinks />
                </Row>
            </Container>
        </motion.div>
    );
}

export default Home;
