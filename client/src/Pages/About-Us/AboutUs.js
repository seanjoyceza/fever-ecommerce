import React from "react";
import "./AboutUs.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='about__page'
    >
    <Container>
      <div className='about__page__wrapper'>
        <h1>About us</h1>
        <p className='about__page__wrapper__first_paragraph'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div>
        
        </div>
        <div className='about__page__featured__products'>
          <p className='about__page__featured__products__title'>
            Fetaured products
          </p>
          <div className='about__page__featured__links__holder'>
            <Link to='/boards' className='about__page__link'>
              <div className='about__page__featured__link'>
              <img src="https://images.pexels.com/photos/1018484/pexels-photo-1018484.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt='' className='about__page__link__image'/>
                <p className='about__page__featured__link__title'>Boards</p>
              </div>
            </Link>
            <Link className='about__page__link'>
              <div className='about__page__featured__link'>
              <img src="https://images.pexels.com/photos/2783837/pexels-photo-2783837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='' className='about__page__link__image'/>

                <p className='about__page__featured__link__title'>Stickers</p>
              </div>
            </Link>
            <Link className='about__page__link'>
              <div className='about__page__featured__link'>
              <img src="https://static.highsnobiety.com/thumbor/D5qvYJxlsxYh61JAaQcTdUjZUA4=/1200x720/static.highsnobiety.com/wp-content/uploads/2021/02/10172634/best-bandanas-buy-online-03.jpg" alt='' className='about__page__link__image'/>

                <p className='about__page__featured__link__title'>Bandanas</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      </Container>
    </motion.div>
  );
};

export default AboutUs;
