import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import styles from "./product_detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faAngleRight,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

const Product_detail = () => {
  const [tabName, setTabName] = useState("detail");
  const location = useLocation();
  const item = location.state.item.item;
  console.log(item);

  // 탭 메뉴 클릭
  const tabClicked = (e) => {
    const target = e.target;
    for (let i = 0; i < 3; i++) {
      const siblingsClassList = target.parentNode.childNodes[i].classList;
      if (siblingsClassList.contains(`${styles["active"]}`)) {
        siblingsClassList.remove(`${styles["active"]}`);
      } else {
        setIsMoreBtnClicked(false);
      }
    }
    target.classList.add(`${styles["active"]}`);

    setTabName(target.dataset.tabname);
  };

  // 상품정보 더보기
  const [isMoreBtnClicked, setIsMoreBtnClicked] = useState(false);
  const detailImgBox = useRef();
  const moreBtnClicked = (e) => {
    detailImgBox.current.classList.toggle(`${styles["active"]}`);
    isMoreBtnClicked ? setIsMoreBtnClicked(false) : setIsMoreBtnClicked(true);
  };

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
          <li
            data-tabname="detail"
            onClick={tabClicked}
            className={styles.active}
          >
            상세정보
          </li>
          <li data-tabname="delivery" onClick={tabClicked}>
            배송/교환/반품
          </li>
          <li data-tabname="review" onClick={tabClicked}>
            후기 0
          </li>
        </ul>
      </div>

      {/* 탭 메뉴 */}
      {
        // 상세정보
        tabName === "detail" ? (
          <div className={styles.detail}>
            <div ref={detailImgBox} className={styles.detailImgBox}>
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
            </div>
            <div className={styles.moreBtn}>
              <button onClick={moreBtnClicked}>
                상품정보 더보기
                {isMoreBtnClicked ? (
                  <FontAwesomeIcon
                    className={styles.downIcon}
                    icon={faAngleUp}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={styles.downIcon}
                    icon={faAngleDown}
                  />
                )}
              </button>
            </div>
          </div>
        ) : // 배송/교환/반품
        tabName === "delivery" ? (
          <>
            <div className={styles.inquiryContainer}>
              <div className={styles.inquiry}>
                <button>1:1 문의</button>
                <p>상품 관련하여 궁금하신 점을 문의해 주세요</p>
              </div>
            </div>
            <div className={styles.delivery}>
              <h3>배송/교환/반품</h3>
              <ol>
                <li> 반품(주문취소 포함) 및 교환 가능 사유</li>
                <ol>
                  <li>
                    제품 작동에 치명적인 결함이 있으며, 중요한 수리를 요하는
                    경우 (설치 후 7일 이내)
                  </li>
                  <li>
                    배송 및 설치 전 주문 취소 (배송당일 취소의 경우, 출발 이후
                    취소 시 비용 발생)
                  </li>
                  <li>배송지 상황에 따른 설치 불가시 (왕복 물류비 부과)</li>
                </ol>
                <li>반품(주문취소 포함) 및 교환 불가 사유</li>
                <ol>
                  <li style={{ listStyleType: "none" }} value={0}>
                    ※ 본 상품은 설치하는 전자제품으로 하기와 같은 사유로 반품 및
                    교환이 불가합니다.(설치 후 사용 시 제품의 가치가 현저히
                    하락하여, 새 제품으로의 판매가 불가능)
                  </li>
                  <li value={1}>
                    개인 변심(색상,가격변동 등)으로 인한 교환 및 반품 불가
                  </li>
                  <li>
                    제품의 중요한 수리를 요하는 하자가 아닌 경우, 설치 후 교환
                    및 반품 불가 (A/S로 진행)
                  </li>
                  <li>
                    개인차(안마강도,신체사이즈 등)으로 인한 교환 및 반품 불가
                    (구매전 제품 테스트 권장)
                  </li>
                  <li>층간 소음 발생으로 인한 교환 및 반품 불가</li>
                </ol>
              </ol>
              <p>
                상기 배송 및 반품·교환 관련 정보가 부족한 경우 본사로 연락
                주십시오.
              </p>
              <p>
                상기 내용에 대한 미숙지로 발생하는 사항에 대해서는
                바디프랜드에서 책임지지 않습니다.
              </p>
            </div>
          </>
        ) : // 후기
        tabName === "review" ? (
          <div></div>
        ) : null
      }

      <div className={styles.btns}>
        <button>구매하기</button>
        <button>렌탈상담 신청</button>
      </div>
    </div>
  );
};

export default Product_detail;
