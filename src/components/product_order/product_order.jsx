import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import styles from "./product_order.module.css";
import { dbService } from "../../service/firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "./alert/alert";
import Postcode from "../product_detail/postcode";
import { requestPaymentFn } from "../../service/payment";

const ProductOrder = ({ authService }) => {
  const [userId, setUserId] = useState("");
  const [userMail, setUserMail] = useState("");
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
        if (user.email) {
          setUserMail(user.email);
        }
      } else {
        setUserId(null);
      }
    });
  });

  let location = useLocation();
  let item = location.state.item;
  let color = location.state.color;
  let count = location.state.count;
  let type = location.state.orderBtn;
  const userName = location.state.userInfo.name;
  const userNumber = location.state.userInfo.number;
  console.log(location.state);
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
      agreeAllRef.current.checked = true;
      submitRef.current.disabled = false;
    } else {
      submitRef.current.classList.remove(`${styles["active"]}`);
      agreeAllRef.current.checked = false;
      submitRef.current.disabled = true;
    }
  };

  // 모두 동의
  const agreeUlRef = useRef();
  const agreeAllChanged = (e) => {
    let lists = agreeUlRef.current.childNodes;
    [...lists].map((li) => (li.childNodes[0].checked = e.target.checked));
    if (e.target.checked) {
      submitRef.current.classList.add(`${styles["active"]}`);
      agreeAllRef.current.checked = true;
      submitRef.current.disabled = false;
    } else {
      submitRef.current.classList.remove(`${styles["active"]}`);
      submitRef.current.disabled = true;
    }
  };

  // 주문 등록 (firebase) Submit
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nameRef = useRef();
  const numberRef = useRef();
  const timeRef = useRef();
  const [address, setAddress] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(address);
    // 유효성 검사
    if (nameRef.current.value === "") {
      setAlertType("name");
      setIsAlert(true);
      return;
    } else if (numberRef.current.value.length !== 11) {
      setAlertType("number");
      setIsAlert(true);
      return;
    } else if (type === "buy") {
      if (
        address === undefined ||
        address.detailAddress === "" ||
        address.adress === "" ||
        address.zonecode === ""
      ) {
        setAlertType("address");
        setIsAlert(true);
        return;
      }
    }

    if (type === "buy") {
      await requestPaymentFn({
        price: item.price,
        order_name: item.name,
        order_id: "asdasdasdsadasdsas",
        user: {
          id: userId,
          username: nameRef.current.value,
          phone: numberRef.current.value,
          email: userMail,
        },
        items: [
          {
            id: "dddddddddddd",
            name: item.name,
            qty: count,
            price: item.price,
          },
        ],
      });
    }

    // DB 업로드 데이터
    const order = {
      item,
      orderName: nameRef.current.value,
      type,
      color,
      count,
      orderedAt: Date.now(),
    };

    const userInfo = {
      userId,
      name: nameRef.current.value,
      number: numberRef.current.value,
      mail: userMail,
    };
    console.log(userId);

    if (type === "rent") {
      Object.assign(order, { time: timeRef.current.value });
    } else if (type === "buy") {
      address && Object.assign(userInfo, { address });
    }

    // 주문 정보 업로드 (order)
    await addDoc(collection(dbService, "order"), {
      order,
      userInfo,
    });

    // 사용자 정보 업데이트 (주문 상품, 주문 정보)
    const docRef = doc(dbService, "users", userId);
    const docSnap = await getDoc(docRef);
    let orderList = [];
    orderList = docSnap.data().orderList;
    orderList.push(order);
    await updateDoc(docRef, {
      orderList,
    });

    setIsSubmitted(true);
  };

  // Alert 확인
  const [alertType, setAlertType] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const handleCheckAlert = () => {
    setIsSubmitted(false);
    setIsAlert(false);
    setAlertType("");
  };

  const popupAlert = (title, content, btnName, path) => {
    return (
      <Alert
        title={title}
        content={content}
        btnName={btnName}
        onCheckAlert={handleCheckAlert}
        path={path}
      />
    );
  };

  // 주소
  const handleAddress = (addressResult) => {
    setAddress(addressResult);
  };

  return (
    <div className={styles.productOrder}>
      {type === "buy" ? (
        <Header title={"주문/결제"} />
      ) : (
        <Header title={"렌탈상담 신청"} />
      )}

      <form onSubmit={onSubmit}>
        <div className={styles.userInfo}>
          <label htmlFor="userName">이름</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="이름 입력"
            value={userName}
          />
          <label htmlFor="userNumber">휴대폰 번호</label>
          <input
            ref={numberRef}
            type="number"
            placeholder="- 없이 숫자만 입력"
            value={userNumber}
          />
          {type === "buy" ? <Postcode onAddress={handleAddress} /> : null}
        </div>
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
                    {type === "buy" ? (
                      <span className={styles.itemPrice}>
                        <span className={styles.price}>
                          {item.price.toLocaleString()}
                        </span>
                        원
                      </span>
                    ) : (
                      <span className={styles.itemPrice}>
                        <span className={styles.price}>
                          {item.rentPrice.toLocaleString()}
                        </span>
                        원 / 월
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {type === "rent" ? (
            <div className={styles.consultation}>
              <h2>상담 요청시간</h2>
              <select ref={timeRef} className={styles.requestTime} name="time">
                <option value="전체 09:00 ~ 18:00">전체 09:00 ~ 18:00</option>
                <option value="오전 09:00 ~ 12:00">오전 09:00 ~ 12:00</option>
                <option value="점심 12:00 ~ 13:00">점심 12:00 ~ 13:00</option>
                <option value="점심 13:00 ~ 14:00">점심 13:00 ~ 14:00</option>
                <option value="오후 14:00 ~ 17:00">오후 14:00 ~ 17:00</option>
              </select>
            </div>
          ) : null}
          <div className={styles.agree}>
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
                <input
                  onChange={agreeListChanged}
                  type="checkbox"
                  id="agree1"
                />
                <label htmlFor="agree1">
                  <p>[필수] 개인정보 제공 동의</p>
                </label>
                <FontAwesomeIcon className={styles.icon} icon={faAngleRight} />
              </li>
              {type === "buy" ? (
                <>
                  <li className={styles.agree1}>
                    <input
                      onChange={agreeListChanged}
                      type="checkbox"
                      id="agree2"
                    />
                    <label htmlFor="agree2">
                      <p>[필수] 결제대행 서비스 이용약관 동의</p>
                    </label>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faAngleRight}
                    />
                  </li>
                  <li className={styles.agree1}>
                    <input
                      onChange={agreeListChanged}
                      type="checkbox"
                      id="agree3"
                    />
                    <label htmlFor="agree3">
                      <p>[필수] 구매조건 확인 및 결제 동의</p>
                    </label>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faAngleRight}
                    />
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          {type === "buy" ? (
            <input
              type="submit"
              ref={submitRef}
              className={styles.submitBtn}
              value={`${item.price.toLocaleString()} 원 결제하기`}
              disabled
            />
          ) : (
            <input
              type="submit"
              ref={submitRef}
              className={styles.submitBtn}
              value="신청하기"
              disabled
            />
          )}
        </div>
      </form>

      {/* 신청하기 클릭시 입력 정보 확인 */}
      {isAlert === true && alertType === "name"
        ? popupAlert("알림", "이름을 입력해주세요.", "확인")
        : isAlert === true && alertType === "number"
        ? popupAlert("알림", "전화번호를 정확히 입력해주세요.", "확인")
        : isAlert === true && alertType === "address"
        ? popupAlert("알림", "주소를 정확히 입력해주세요.", "확인")
        : null}

      {/* 신청하기 클릭 */}
      {isSubmitted === true && type === "rent"
        ? popupAlert("알림", "렌탈상담 신청이 완료되었습니다.", "확인", "/")
        : isSubmitted === true && type === "buy"
        ? popupAlert("알림", "상품 주문이 완료되었습니다.", "확인", "/")
        : null}
    </div>
  );
};

export default ProductOrder;
