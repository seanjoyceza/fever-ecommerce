import React from "react";

import "./CheckoutProduct.css";

const CheckoutProduct = (props) => {
  // console.log(props.price);
  const price = `R${parseInt(props.price).toFixed(2)}`;

  return (
    <div className='checkout__item'>
      <div className='checkout__item__image__wrapper'>
        <img
          className='checkout__item__image'
          src={"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}
          alt=''
        />
      </div>
      <div className='checkout__item__text__display'>
        <h3 className='checkout__item__title'>Carry bag</h3>
        <p className='checkout__item__size'>
          Size:&nbsp; <b>small</b>{" "}
        </p>
        <p className='checkout__item__price'>
          Item Price:&nbsp; <b>R450</b>{" "}
        </p>

        <div className='checkout__item__quantity__select'>
          <button
            className='checkout__item__quantity__select__plus'
            onClick={props.onRemove}
          >
            -
          </button>
          <span className='checkout__item__quantity__select__number'>
            {props.quantity}
          </span>
          <button
            className='checkout__item__quantity__select__plus'
            onClick={props.onAdd}
          >
            +
          </button>
        </div>

        <button className='checkout__item__removeButton'>Remove item</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
