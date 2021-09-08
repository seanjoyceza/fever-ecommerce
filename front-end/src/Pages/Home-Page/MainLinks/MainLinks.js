import React from "react";
import "./MainLinks.css";
import { Link } from "react-router-dom";

function MainLinks() {
  return (
    <div className='main-links__wrapper'>
      <Link to='boards' className='main-links main-links__large one'>
        <div>
          <img
            className='link__image'
            src='https://images.pexels.com/photos/165236/pexels-photo-165236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='link'
          />
          <p className='main-links__title'>Boards</p>
        </div>
      </Link>
      <Link to='socks' className='main-links main-links__small two'>
        <div>
          <img
            className='link__image'
            src='https://images.pexels.com/photos/1167032/pexels-photo-1167032.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='link'
          />
          <p className='main-links__title'>Socks</p>
        </div>
      </Link>
      <Link to='bandanas' className='main-links main-links__small three'>
        <div>
          <img
            className='link__image'
            src='https://static.highsnobiety.com/thumbor/D5qvYJxlsxYh61JAaQcTdUjZUA4=/1200x720/static.highsnobiety.com/wp-content/uploads/2021/02/10172634/best-bandanas-buy-online-03.jpg'
            alt='link'
          />
          <p className='main-links__title'>Bandanas</p>
        </div>
      </Link>
      <Link to='stickers' className='main-links main-links__large four'>
        <div>
          <img
            className='link__image'
            src='https://images.pexels.com/photos/2783837/pexels-photo-2783837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='link'
          />
          <p className='main-links__title'>Stickers</p>
        </div>
      </Link>
      <Link to='clothing' className='main-links main-links__large five'>
        <div>
          <img
            className='link__image'
            src='https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='link'
          />
          <p className='main-links__title'>Clothing</p>
        </div>
      </Link>
      <Link to='masks' className='main-links main-links__small six'>
        <div>
          <img
            className='link__image'
            src='https://images.pexels.com/photos/2698475/pexels-photo-2698475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='link'
          />
          <p className='main-links__title'>Masks</p>
        </div>
      </Link>
      <Link to='mugs' className='main-links main-links__small seven'>
        <div>
          <img
            className='link__image'
            src='https://img.freepik.com/free-psd/arrangement-minimal-coffee-mugs_23-2149027129.jpg?size=626&ext=jpg'
            alt='link'
          />
          <p className='main-links__title'>Coffee Mugs</p>
        </div>
      </Link>
    </div>
  );
}

export default MainLinks;
