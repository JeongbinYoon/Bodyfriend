import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../../service/firebase";
import Header from "../../header/header";
import styles from "./myorder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function MyOrder({ authService }) {
  // 사용자 주문 데이터 로드
  const [userData, setUserData] = useState("");
  const [orderList, setOrderList] = useState("");
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    setOrderList(userData.orderList);
    setUserInfo(userData.userInfo);
  }, [userData]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        getUserData(user);
      } else {
      }
    });
  }, []);

  const getUserData = async (user) => {
    const userDocRef = doc(dbService, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    docSnap && setUserData(docSnap.data());
  };

  // 상세 페이지 이동
  let navigate = useNavigate();
  const goToProductDetail = (item) => {
    navigate("/product/productDetail", {
      state: {
        item,
        userInfo,
      },
    });
  };

  return (
    <div className={styles.mypage}>
      <Header title={"주문/배송 조회"} />
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

      <div className={styles.itemsContainer}>
        <ul className={styles.items}>
          {orderList && orderList.length > 0 ? (
            orderList.map((product, idx) => (
              <li
                onClick={() => {
                  goToProductDetail(product);
                }}
                className={styles.item}
                key={idx}
              >
                <div className={styles.imgbox}>
                  <img
                    className={styles.img}
                    src={product.item.imgURL}
                    alt=""
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.name}>{product.item.name}</h3>
                  <div className={styles.itemInfo}>
                    <p>
                      옵션: <span>{product.color}</span>
                    </p>
                    <p>
                      수량: <span>{product.count}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className={styles.noItem}>
              <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
              <span>주문하신 내역이 없습니다.</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
export default MyOrder;
