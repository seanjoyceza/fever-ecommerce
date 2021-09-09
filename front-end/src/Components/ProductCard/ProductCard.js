import React from "react";
import "./ProductCard.css";

function ProductCard({ title, price, image, id, link }) {
    // console.log(id);
    return (
        <div className="productCard">
            <div className="productCard__image_holder">
                <img className="productCard__image" src={image} alt="product" />
            </div>
            <p className="productCard__title">
                {title.length > 35 ? title.substring(0, 35 - 3) + "..." : title}
            </p>
            <p className="productCard__price">${price}</p>
        </div>
    );
}

export default ProductCard;
