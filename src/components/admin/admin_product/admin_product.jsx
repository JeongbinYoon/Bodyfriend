import React, { useRef, useState, useEffect } from "react";
import { dbService } from "../../../service/firebase";
import {
  collection,
  addDoc,
  orderBy,
  limit,
  startAt,
  startAfter,
  endAt,
  onSnapshot,
  query,
} from "firebase/firestore";
import adminStyles from "../admin.module.css";
import styles from "./admin_product.module.css";
import Admin_products_item from "./admin_products_item";

const Admin_prodcut = ({ userId }) => {
  // 의자 데이터 로드
  let first;
  let pageSize = 10;
  const [pageNow, setPageNow] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const prevBtnClick = () => {
    getChairs();
    setPageNow(pageNow > 1 ? pageNow - 1 : 1);
  };
  const nextBtnClick = () => {
    let totalPage = Math.floor(totalCount / pageSize) + 1;
    setPageNow(totalPage > pageNow ? pageNow + 1 : totalPage);
    let first = query(
      collection(dbService, "chair"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    let next;
    onSnapshot(first, (snapshot) => {
      let last = snapshot.docs[snapshot.docs.length - 1];
      console.log(last);
      next = query(
        collection(dbService, "chair"),
        orderBy("createdAt", "desc"),
        startAfter(last.data().createdAt),
        limit(pageSize)
      );
      onSnapshot(next, (snapshot) => {
        const chairArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChairs(chairArr);
      });
      // first = next;
    });
  };

  const [chairs, setChairs] = useState("");
  const getChairs = () => {
    let total = query(collection(dbService, "chair"));
    onSnapshot(total, (snapshot) => {
      setTotalCount(snapshot.docs.length);
    });

    first = query(
      collection(dbService, "chair"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    onSnapshot(first, (snapshot) => {
      const chairArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChairs(chairArr);
    });
  };

  useEffect(() => {
    getChairs();
  }, []);

  // 아이템 등록
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [item, setValues] = useState({
    name: "",
    price: 0,
    rentPrice: 0,
    imgURL: "",
  });
  const itemNameRef = useRef();
  const itemPriceRef = useRef();
  const itemRentPriceRef = useRef();

  useEffect(() => {
    if (isSubmitted) {
      const docRef = addDoc(collection(dbService, "chair"), {
        item,
        createdAt: Date.now(),
        creatorId: userId,
      });
      setIsSubmitted(false);
    }
  }, [item]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setValues((prev) => ({
      name: itemNameRef.current.value,
      price: Number(itemPriceRef.current.value),
      rentPrice: Number(itemRentPriceRef.current.value),
      imgURL: "",
    }));
  };

  console.log(chairs);
  return (
    <>
      <section className={adminStyles.section}>
        <div className={adminStyles.sectionHeader}>
          <h2 className={adminStyles.sectionTitle}>등록 제품</h2>
        </div>
        <div
          className={`${adminStyles.sectionBody} ${styles.productContainer}`}
        >
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>선택</th>
                <th>이미지</th>
                <th>제품명</th>
                <th>가격</th>
                <th>렌탈가</th>
                <th className={styles.hide}>날짜</th>
                <th className={styles.hide}>작성자</th>
              </tr>
            </thead>
            <tbody>
              {chairs
                ? chairs.map((chair) => (
                    <Admin_products_item item={chair} key={chair.id} />
                  ))
                : null}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="2">제품 수</td>
                <td>{totalCount}</td>
                <td colSpan="3">
                  페이지
                  {`${pageNow} / ${Math.floor(totalCount / pageSize) + 1}`}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className={styles.btns}>
            <button className={styles.prevBtn} onClick={prevBtnClick}>
              이전
            </button>
            <button className={styles.nextBtn} onClick={nextBtnClick}>
              다음
            </button>
          </div>
        </div>
      </section>
      <form onSubmit={onSubmit}>
        <input ref={itemNameRef} type="text" placeholder="제품명" />
        <input ref={itemPriceRef} type="number" placeholder="가격" />
        <input ref={itemRentPriceRef} type="number" placeholder="렌트가" />
        <input type="submit" value="등록" />
      </form>
    </>
  );
};

export default Admin_prodcut;
