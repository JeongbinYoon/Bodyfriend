import styles from "./main_friendmall.module.css";
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { dbService } from "../../service/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

const Main_friendmall = ({ userInfo, type }) => {
  // 상품 데이터 로드
  const [products, setProducts] = useState("");
  const getProducts = async () => {
    const q = query(collection(dbService, type));
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
              {type === "chair"
                ? "안마의자"
                : type === "waterPurifier" && "W정수기"}
            </h2>
            <p>
              {type === "chair"
                ? "10년 더 건강하게 바디프랜드"
                : type === "waterPurifier" && "예쁜 물, 더 스마트하게!"}
            </p>
            <Link to="/product/productLists" state={{ type }}>
              <button>더보기+</button>
            </Link>
          </div>
          <div className={styles.itemsContainer}>
            <ul className={styles.items}>
              {products.map((product) => (
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
        </>
      )}
    </>
  );
};

export default Main_friendmall;
