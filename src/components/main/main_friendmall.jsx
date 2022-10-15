import styles from "./main_friendmall.module.css";
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../service/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

const Main_friendmall = ({ userInfo, item }) => {
  // 의자 데이터 로드
  const [products, setProducts] = useState("");
  const getProducts = async () => {
    const q = query(collection(dbService, item));
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
    <>
      {products && (
        <>
          <div className={styles.titleContianer}>
            <h2 className={styles.title}>
              {item === "chair"
                ? "안마의자"
                : item === "waterPurifier" && "W정수기"}
            </h2>
            <p>
              {item === "chair"
                ? "10년 더 건강하게 바디프랜드"
                : item === "waterPurifier" && "예쁜 물, 더 스마트하게!"}
            </p>
            <button>더보기+</button>
          </div>
          <div className={styles.itemsContainer}>
            <ul className={styles.items}>
              {products.map((chair) => (
                <li
                  onClick={() => {
                    goToProductDetail(chair);
                  }}
                  className={styles.item}
                  key={chair.id}
                >
                  <div className={styles.imgbox}>
                    <img
                      className={styles.img}
                      src={chair.item.imgURL}
                      alt=""
                    />
                  </div>
                  <h3 className={styles.name}>{chair.item.name}</h3>
                  <div className={styles.itemInfo}>
                    <p>
                      {chair.item.price.toLocaleString()}
                      <span> 원</span>
                      <span> / 구매가</span>
                    </p>
                    <p>
                      {chair.item.rentPrice.toLocaleString()}
                      <span> 원</span>
                      <span> / 렌탈가(월)</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Main_friendmall;
