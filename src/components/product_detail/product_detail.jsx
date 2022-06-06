import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import styles from "./product_detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Product_detail = () => {
  const location = useLocation();
  const item = location.state.item.item;
  console.log(item);

  return (
    <div className={styles.productDetail}>
      <Header title={"상품정보"} />
      <div className={styles.bg}></div>
      <div className={styles.imgBox}>
        <img src={item.imgURL} alt={item.name} />
      </div>
      <h2 className={styles.itemName}>{item.name}</h2>
      <div className={styles.itemInfo}>
        <p>
          {item.price.toLocaleString()}
          <span> 원</span>
          <span> / 구매가</span>
        </p>
        <p>
          {item.rentPrice.toLocaleString()}
          <span> 원</span>
          <span> / 렌탈가(월)</span>
        </p>
      </div>
      <div className={styles.findStore}>
        <div className={styles.store_bg}>
          <div className={styles.storeIcon}>
            <FontAwesomeIcon icon={faStore} />
            <div className={styles.iconLight}></div>
          </div>
          <div className={styles.txts}>
            <p>가까운 전시장 찾기</p>
            <p>이 제품을 직접 체험해 보시려면?</p>
          </div>
          <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
        </div>
      </div>
      <div className={styles.infoTabContainer}>
        <ul className={styles.infoTab}>
          <li className={styles.active}>상세정보</li>
          <li>배송/교환/반품</li>
          <li>후기</li>
        </ul>
      </div>
      (
      <div className={styles.detailImgs}>
        <img
          className={styles.detailImg01}
          src="https://bodyfriend.speedgabia.com/01_BODYFRIEND/01_PRODUCT/atlan/m_1080/atlan_m_1080_01.jpg"
          alt=""
        />
        <img
          className={styles.detailImg02}
          src="https://bodyfriend.speedgabia.com/01_BODYFRIEND/01_PRODUCT/atlan/m_1080/atlan_m_1080_02.jpg"
          alt=""
        />
        <img
          className={styles.detailImg03}
          src="https://bodyfriend.speedgabia.com/01_BODYFRIEND/01_PRODUCT/atlan/m_1080/atlan_m_1080_03.jpg"
          alt=""
        />
        <img
          className={styles.detailImg04}
          src="https://bodyfriend.speedgabia.com/01_BODYFRIEND/01_PRODUCT/atlan/m_1080/atlan_m_1080_04.jpg"
          alt=""
        />
      </div>
      )
      <div className={styles.btns}>
        <button>구매하기</button>
        <button>렌탈상담 신청</button>
      </div>
    </div>
  );
};

export default Product_detail;
