import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../../service/firebase";
import Header from "../header/header";
import styles from "./product_list.module.css";

function ProductLists({ authService }) {
  const location = useLocation();
  const productType = location.state.type;

  // 상품 데이터 로드
  const [products, setProducts] = useState("");
  const getProducts = async () => {
    const q = query(collection(dbService, productType));
    onSnapshot(q, (snapshot) => {
      const productArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productArr);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  //   사용자 데이터 로드
  const [userData, setUserData] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
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
    <div>
      <Header title="쇼핑" />
      <div className={styles.bgImg}>
        {productType === "chair" ? (
          <img
            src="https://m.bodyfriend.co.kr/img/content/img_bfChair_banner.jpg?version=202009181526"
            alt=""
          />
        ) : productType === "waterPurifier" ? (
          <img
            src="https://m.bodyfriend.co.kr/img/content/img_bfBrain_banner.jpg?version=202009181526"
            alt=""
          />
        ) : null}
      </div>
      <div className={styles.itemsContainer}>
        <ul className={styles.items}>
          {products &&
            products.map((product) => (
              <li
                onClick={() => {
                  goToProductDetail(product);
                }}
                className={styles.item}
                key={product.id}
              >
                <div className={styles.imgbox}>
                  <img
                    className={styles.img}
                    src={product.item.imgURL}
                    alt=""
                  />
                </div>
                <h3 className={styles.name}>{product.item.name}</h3>
                <div className={styles.itemInfo}>
                  <p>
                    {product.item.price.toLocaleString()}
                    <span> 원</span>
                    <span> / 구매가</span>
                  </p>
                  <p>
                    {product.item.rentPrice.toLocaleString()}
                    <span> 원</span>
                    <span> / 렌탈가(월)</span>
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default ProductLists;
