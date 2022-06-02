import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faMoneyCheckDollar,
  faListCheck,
  faPeopleCarryBox,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onSidebarClicked, onCloseSidebar }) => {
  console.log(onSidebarClicked);
  const handleCloseSidebar = () => {
    onCloseSidebar(false);
  };
  return (
    <div
      className={
        onSidebarClicked
          ? `${styles.sidebar} ${styles.clicked}`
          : `${styles.sidebar}`
      }
    >
      <div className={styles.bg}></div>

      <div className={styles.sidebarContainer}>
        <ul>
          <li className={styles.adminProfile}>
            <div className={styles.adminImgBox}>
              <img
                src="https://www.bodyfriend.co.kr/upload/goods/middle/d3X7z5WXBqTDZSKXZkSbZxDIrrbgP9t.jpg"
                alt="adminImg"
              />
            </div>
            <span className={styles.adminName}>admin1</span>
            <button onClick={handleCloseSidebar} className={styles.closeBtn}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </li>
          <li>
            <FontAwesomeIcon
              className={styles.menuIcon}
              icon={faArrowUpRightFromSquare}
            />
            <span>사이트 바로가기</span>
          </li>
        </ul>
        <h2>사이트관리</h2>
        <ul>
          <li>
            <FontAwesomeIcon className={styles.menuIcon} icon={faListCheck} />
            <span>제품관리</span>
          </li>
          <li>
            <FontAwesomeIcon
              className={styles.menuIcon}
              icon={faMoneyCheckDollar}
            />
            <span>제품주문</span>
          </li>
          <li>
            <FontAwesomeIcon
              className={styles.menuIcon}
              icon={faPeopleCarryBox}
            />
            <span>렌탈상담신청</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
