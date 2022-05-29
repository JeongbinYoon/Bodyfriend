import React, { useRef, useState, useEffect } from "react";
import { dbService } from "../../service/firebase";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import adminStyles from "./admin.module.css";
import styles from "./admin_product.module.css";
import Header_admin from "../header/header_admin";

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
  const [item, setValues] = useState({
    name: "",
    price: 0,
    rentPrice: 0,
    imgURL: "",
  });
  const itemNameRef = useRef();
  const itemPriceRef = useRef();
  const itemRentPriceRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({
      name: itemNameRef.current.value,
      price: Number(itemPriceRef.current.value),
      rentPrice: Number(itemRentPriceRef.current.value),
      imgURL: "",
    });
    try {
      const docRef = await addDoc(collection(dbService, "chair"), {
        item,
        createdAt: Date.now(),
        creatorId: userId,
      });
      //   console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  console.log(chairs);
  return (
    <>
      <section className={adminStyles.section}>
        <div className={adminStyles.sectionHeader}>
          <h2 className={adminStyles.sectionTitle}>등록 상품</h2>
        </div>
        <div className={adminStyles.sectionBody}>asd</div>
        <ul></ul>
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
