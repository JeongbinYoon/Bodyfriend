import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import styles from "./product_order.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

const Product_order = () => {
  let location = useLocation();
  let item = location.state.item;
  let color = location.state.color;
  let count = location.state.count;
  let orderBtn = location.state.orderBtn;
  console.log(item);
  console.log(`수량 ${count} 색상 : ${color} ${orderBtn}`);

  // 토글
  const [isClicked, setIsClicked] = useState(false);
  const toggle = (e) => {
    setIsClicked(!isClicked);
    console.log(e.currentTarget);
  };

  // 체크 박스 선택
  const submitRef = useRef();
  const agreeAllRef = useRef();

  // 하나씩 동의
  let agreeCount = 0;
  const agreeListChanged = () => {
    agreeCount = 0;
    let lists = agreeUlRef.current.childNodes;
    [...lists].map((li) => {
      if (li.childNodes[0].checked === true) {
        agreeCount++;
      }
    });

    // 모두 체크했을 경우
    if (agreeCount === lists.length) {
      submitRef.current.classList.add(`${styles["active"]}`);

      console.log(agreeAllRef.current.checked);
      agreeAllRef.current.checked = true;
    } else {
      submitRef.current.classList.remove(`${styles["active"]}`);
      agreeAllRef.current.checked = false;
    }
  };

  // 모두 동의
  const agreeUlRef = useRef();
  const agreeAllChanged = (e) => {
    let lists = agreeUlRef.current.childNodes;
    [...lists].map((li) => (li.childNodes[0].checked = e.target.checked));
    // console.log(submitRef.current);
    if (e.target.checked) {
      submitRef.current.classList.add(`${styles["active"]}`);
    } else {
      submitRef.current.classList.remove(`${styles["active"]}`);
    }
  };

  return (
    <div className={styles.productOrder}>
      {orderBtn === "buy" ? (
        <Header title={"주문/결제"} />
      ) : (
        <Header title={"렌탈상담 신청"} />
      )}

      <form className={styles.userInfo}>
        <label htmlFor="userName">이름</label>
        <input type="text" placeholder="이름입력" />
        <label htmlFor="userNumber">휴대폰번호</label>
        <input type="text" placeholder="- 없이 숫자만 입력" />
      </form>

      <div className={styles.selectedItem}>
        <div onClick={toggle} className={styles.selectedItemBtn}>
          <h2>신청 상품</h2>
          {isClicked ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </div>
        {!isClicked ? (
          <div className={styles.itemInfoContainer}>
            <div className={styles.itemInfo}>
              <div className={styles.itemInfoDetail}>
                <div className={styles.itemImgBox}>
                  <img
                    className={styles.itemImgBox}
                    src={item.imgURL}
                    alt={item.name}
                  />
                </div>
                <div className={styles.itemText}>
                  <h3>{item.name}</h3>
                  <div>
                    <span className={styles.itemTextOption}>옵션</span>
                    <span>
                      색상: {color} | 수량: {count}개
                    </span>
                  </div>
                  <div>
                    <span className={styles.itemTextDelivery}>배송</span>
                    <span>
                      무료배송 (제주도 및 도서산간 지역 추가 운임비 발생)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className={styles.consultation}>
          <h2>상담 요청시간</h2>
          <select className={styles.requestTime} name="time">
            <option value="1">전체 09:00 ~ 18:00</option>
            <option value="2">오전 09:00 ~ 12:00</option>
            <option value="3">점심 12:00 ~ 13:00</option>
            <option value="4">점심 13:00 ~ 14:00</option>
            <option value="5">오후 14:00 ~ 17:00</option>
          </select>

          <div className={styles.agreeAllBtn}>
            <input
              ref={agreeAllRef}
              onChange={agreeAllChanged}
              type="checkbox"
              id="agreeAll"
            />
            <label htmlFor="agreeAll">
              <p>아래 내용에 모두 동의합니다.</p>
            </label>
          </div>
          <ul ref={agreeUlRef} className={styles.agreeList}>
            <li className={styles.agree1}>
              <input onChange={agreeListChanged} type="checkbox" id="agree1" />
              <label htmlFor="agree1">
                <p>[필수] 개인정보 제공 동의</p>
              </label>
              <FontAwesomeIcon className={styles.icon} icon={faAngleRight} />
            </li>
            <li className={styles.agree1}>
              <input onChange={agreeListChanged} type="checkbox" id="agree2" />
              <label htmlFor="agree2">
                <p>[필수] 개인정보 제공 동의</p>
              </label>
              <FontAwesomeIcon className={styles.icon} icon={faAngleRight} />
            </li>
          </ul>
        </div>

        <button ref={submitRef} className={styles.submitBtn}>
          신청하기
        </button>
      </div>
    </div>
  );
};

export default Product_order;
