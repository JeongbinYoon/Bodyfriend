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
      <div className={styles.imgBox}>
        <img
          className={styles.img1}
          src="https://m.bodyfriend.co.kr/img/content/img_chair_02.png"
          alt="배너1"
        />
      </div>
      <div className={styles.imgBox}>
        <img
          className={styles.img2}
          src="https://m.bodyfriend.co.kr/img/content/img_chair_05.png"
          alt="배너2"
        />
      </div>
      <div className={styles.imgBox}>
        <img
          className={styles.img2}
          src="https://m.bodyfriend.co.kr/img/content/img_chair_04.png"
          alt="배너2"
        />
      </div>
      <div className={styles.imgBox}>
        <img
          className={styles.img2}
          src="https://m.bodyfriend.co.kr/img/content/img_chair_01.png"
          alt="배너2"
        />
      </div>
    </Slider>
  );
};

export default Banner;
