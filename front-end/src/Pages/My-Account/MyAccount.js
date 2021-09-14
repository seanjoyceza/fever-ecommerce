import React from "react";
import "./MyAccount.css";
import { motion } from "framer-motion";
import PageHeader from "./PageHeader";
import MyOrders from "./MyOrders";
import { Container, Row, Col } from "react-bootstrap";

function MyAccount() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="my_account_container"
        >
            <Container>
                <Row>
                    <PageHeader />
                    <MyOrders />
                </Row>
            </Container>
        </motion.div>
    );
}

export default MyAccount;
