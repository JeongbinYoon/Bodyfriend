import React, { useRef, useState, useEffect } from "react";
import { dbService } from "../../service/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
const Admin = ({ authService }) => {
  const [userId, setUserID] = useState("");
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        console.log(user);
        setUserID(user.uid);
      } else {
        setUserID(null);
      }
    });
  });

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
