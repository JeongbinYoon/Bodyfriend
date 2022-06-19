import React from "react";
import styles from "./banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.imgBox}>
        <img className={styles.img1} src="./banner1.jpg" alt="배너1" />
        <div className={styles.img2}></div>
        <div className={styles.img3}></div>
        <div className={styles.img4}></div>
        <div className={styles.img5}></div>
      </div>
    </div>
  );
};

export default Banner;
