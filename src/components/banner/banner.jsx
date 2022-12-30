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
          src="https://www.bodyfriend.co.kr/upload/bbs/banner/fe9768ac912141cca1c312698ff5646a.jpg"
          alt="배너1"
        />
      </div>
      <div className={styles.imgBox}>
        <img
          src="https://www.bodyfriend.co.kr/upload/bbs/banner/8c7df9f00f094c878cf777f8458b5f44.jpg"
          alt="배너2"
        />
      </div>
      <div className={styles.imgBox}>
        <img
          src="https://www.bodyfriend.co.kr/upload/bbs/banner/1522d9d3733e4c6c9ab39775a66e8da9.jpg"
          alt="배너3"
        />
      </div>
      <div className={styles.imgBox}>
        <img
          src="https://www.bodyfriend.co.kr/upload/bbs/banner/792ff58c487a45d0808aa49cbda2b039.jpg"
          alt="배너4"
        />
      </div>
    </Slider>
  );
};

export default Banner;
