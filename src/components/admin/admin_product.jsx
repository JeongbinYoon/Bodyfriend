import React, { useRef, useState, useEffect } from "react";
import { dbService } from "../../service/firebase";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import adminStyles from "./admin.module.css";
import styles from "./admin_product.module.css";

const Admin_prodcut = ({ userId }) => {
  // 의자 데이터 로드
  const [chairs, setChairs] = useState("");
  const getChairs = async () => {
    const q = query(collection(dbService, "chair"));
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
      const date = new Date();
      let createdAt =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      const docRef = addDoc(collection(dbService, "chair"), {
        item,
        createdAt: createdAt,
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
              {chairs &&
                chairs.map((chair) => (
                  <tr key={chair.id}>
                    <td className={styles.checkBox}>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <img
                        width="30"
                        src={chair.item.imgURL}
                        alt="productImg"
                      />
                    </td>
                    <td className={styles.name}>{chair.item.name}</td>
                    <td>{chair.item.price.toLocaleString()}</td>
                    <td>{chair.item.rentPrice.toLocaleString()}</td>
                    <td className={styles.hide}>{chair.createdAt}</td>
                    <td className={styles.hide}>{chair.creatorId}</td>
                  </tr>
                ))}
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
