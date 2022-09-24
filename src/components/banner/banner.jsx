import React from "react";
import styles from "./banner.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className={styles.slider}>
      <div className="imgBox">
        <img
          className={styles.img1}
          src="https://www.bodyfriend.co.kr/upload/bbs/banner/daef820bd96249b58e2ddc26d88fdb2f.jpg"
          alt="배너1"
        />
      </div>
      <div className="imgBox">
        <img
          className={styles.img2}
          src="https://www.bodyfriend.co.kr/upload/bbs/banner/876d9c69c6e84bfeb47e8ba08b2350e6.jpg"
          alt="배너2"
        />
      </div>
    </Slider>
  );
};

export default Banner;
