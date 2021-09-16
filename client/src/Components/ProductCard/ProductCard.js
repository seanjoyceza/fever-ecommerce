import React from "react";
import "./ProductCard.css";

import Fade from "react-reveal/Fade";

function ProductCard({ title, price, image }) {
    // console.log(id);
    return (
        <div className="productCard">
            <Fade delay={500}>
                <div className="productCard__image_holder">
                    <img
                        className="productCard__image"
                        src={image}
                        alt="product"
                    />
                    {/* {console.log(imsge)} */}
                </div>
            </Fade>
            <Fade delay={600}>
                <p className="productCard__title">
                    {title.length > 32
                        ? title.substring(0, 32 - 3) + "..."
                        : title}
                </p>
            </Fade>
            <Fade delay={700}>
                <p className="productCard__price">${price}</p>
            </Fade>
        </div>
    );
}

export default ProductCard;
