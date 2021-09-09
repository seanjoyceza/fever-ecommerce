import React, { useState, useEffect } from "react";
import './ProductDetailPage.css'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import axios from "axios";
const Product = ({ match }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = () => {
    axios
      .get(`https://fakestoreapi.com/products/${match.params.id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='productDetail__page'
    >
      {product.image}
      {product.title}
      {product.price}
      {product.description}
      <div className='back'>
        <Link to='/'>FEATURED PRODUCTS</Link>
      </div>
    </motion.div>
  );
};
export default Product;
