import React, { useRef, useState } from "react";
import { dbService } from "../../service/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
const Admin = (props) => {
  const [item, setValues] = useState({
    name: "",
    price: "",
    rentPrice: "",
    imgURL: "",
  });
  const itemNameRef = useRef();
  const itemPriceRef = useRef();
  const itemRentPriceRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({
      itemName: itemNameRef.current.value,
      price: itemPriceRef.current.value,
      rentPrice: itemRentPriceRef.current.value,
      imgURL: "",
    });
    try {
      const docRef = await addDoc(collection(dbService, "chair"), {
        item,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <h1>admin</h1>
      <form onSubmit={onSubmit}>
        <input ref={itemNameRef} type="text" placeholder="제품명" />
        <input ref={itemPriceRef} type="number" placeholder="가격" />
        <input ref={itemRentPriceRef} type="number" placeholder="렌트가" />
        <input type="submit" value="등록" />
      </form>
    </>
  );
};

export default Admin;
