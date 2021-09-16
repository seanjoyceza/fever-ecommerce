import React, { useState } from "react";
import "./SearchModal.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SearchModal = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                className="my_button"
                variant="primary"
                onClick={() => setShow(true)}
            >
                Search
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-10w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body>
                    <div>
                        <form>
                            <input
                                type="text"
                                placeholder="Search"
                                className="sidebar_product__search__input"
                                // onChange={props.searchProducts}
                            />
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SearchModal;
