import React, { useEffect, useState } from "react";
import Header from "../header/header";
import styles from "./mypage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Mypage = ({ authService }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        if (user.displayName) {
          setUserName(user.displayName);
        } else {
          setUserName(user.email.split("@")[0]);
        }
      }
    });
  });

  return (
    <div className={styles.mypage}>
      <Header title={"마이페이지"} />
      <div className={styles.userInfo}>
        <div className={styles.container}>
          <div>
            <span className={styles.userName}>{userName}님</span>
            <span className={styles.time}>
              사용시간
              <span className={styles.timeVal}> 0</span>분
            </span>
          </div>
          <div>
            <div className={styles.coupon}>
              <span>쿠폰</span>
              <span className={styles.couponCount}>0</span>
            </div>
            <div className={styles.using}>
              <span>사용중 제품</span>
              <span className={styles.usingCount}>0</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.delivery}>
        <Link to="/myorder">
          <div className={styles.title}>
            <span>주문/배송조회</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </div>
        </Link>
        <div className={styles.deliveryStatus}>
          <div className={styles.status}>
            <span>0</span>
            <span>결제/입금</span>
          </div>
          <div className={styles.status}>
            <span>0</span>
            <span>배송중</span>
          </div>
          <div className={styles.status}>
            <span>0</span>
            <span>배송완료</span>
          </div>
          <div className={styles.status}>
            <span>0</span>
            <span>주문취소</span>
          </div>
          <div className={styles.status}>
            <span>0</span>
            <span>교환/반품</span>
          </div>
        </div>
      </div>

      <div className={styles.myList}>
        <ul>
          <li>
            <span>이용후기</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
          <li>
            <span>관심상품</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
          <li>
            <span>간편결제 카드 관리</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
        </ul>

        <ul>
          <li className={styles.listTitle}>
            <span>고객센터</span>
          </li>
          <li>
            <span>1:1 문의</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
          <li>
            <span>서비스 접수</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
          <li>
            <span>이전/설치 신청</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
        </ul>

        <ul>
          <li>
            <span>회원정보 수정</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
          <li>
            <span>설정</span>
            <FontAwesomeIcon className={styles.nextIcon} icon={faAngleRight} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Mypage;
