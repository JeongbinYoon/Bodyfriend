import React, { useRef, useState, useEffect } from "react";
import { dbService } from "../../service/firebase";
import {
  collection,
  addDoc,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import adminStyles from "./admin.module.css";
import styles from "./admin_product.module.css";
import Admin_products_item from "./admin_products_item";

const Admin_prodcut = ({ userId }) => {
  // 의자 데이터 로드
  const [chairs, setChairs] = useState("");
  const getChairs = async () => {
    const q = query(
      collection(dbService, "chair"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
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
        <div className={adminStyles.sectionBody}>
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
                <td colSpan="4">제품수</td>
                <td>{chairs.length}</td>
              </tr>
            </tfoot>
          </table>
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
