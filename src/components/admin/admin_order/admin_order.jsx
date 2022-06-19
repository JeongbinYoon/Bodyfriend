import React, { useRef, useState, useEffect } from "react";
import { dbService, storageService } from "../../../service/firebase";
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
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import adminStyles from "../admin.module.css";
import styles from "../admin_product/admin_product.module.css";
import Admin_products_item from "../admin_product/admin_products_item";
import Admin_order_item from "./admin_order_item";

const Admin_order = () => {
  // 주문 데이터 로드
  const [items, setItems] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const getItems = async () => {
    const q = query(collection(dbService, "order"));
    onSnapshot(q, (snapshot) => {
      const itemsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(itemsArr);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

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
              {items
                ? items.map((chair) => (
                    <Admin_order_item item={chair} key={chair.id} />
                  ))
                : null}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="2">제품 수</td>
                <td>{totalCount}</td>
                {/* <td colSpan="3">페이지</td> */}
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </>
  );
};

export default Admin_order;
