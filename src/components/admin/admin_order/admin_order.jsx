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
import styles from "..//admin_product/admin_product.module.css";
// import Admin_products_item from "./admin_products_item";

const Admin_order = () => {
  // 의자 데이터 로드
  const [items, setItems] = useState("");
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

  return <div>as</div>;
};

export default Admin_order;
