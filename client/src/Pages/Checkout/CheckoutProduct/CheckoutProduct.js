import React from "react";

import "./CheckoutProduct.css";

const CheckoutProduct = ({
    image,
    title,
    quantity,
    itemPrice,
    size,
    onRemove,
    onAdd,
}) => {
    // console.log(props.price);
    const price = `R${parseInt(itemPrice).toFixed(2)}`;

    return (
        <div className="checkout__item">
            <div className="checkout__item__image__wrapper">
                <img className="checkout__item__image" src={image} alt="" />
            </div>
            <div className="checkout__item__text__display">
                <h3 className="checkout__item__title">{title}</h3>
                <p className="checkout__item__size">
                    Size:&nbsp; <b>{size}</b>
                </p>
                <p className="checkout__item__price">
                    Item Price:&nbsp; <b>R{itemPrice}</b>
                </p>

                <div className="checkout__item__quantity__select">
                    <button
                        className="checkout__item__quantity__select__plus"
                        onClick={onRemove}
                    >
                        -
                    </button>
                    <span className="checkout__item__quantity__select__number">
                        {quantity}
                    </span>
                    <button
                        className="checkout__item__quantity__select__plus"
                        onClick={onAdd}
                    >
                        +
                    </button>
                </div>

                <button className="checkout__item__removeButton">
                    Remove item
                </button>
            </div>
        </div>
    );
};

export default CheckoutProduct;
