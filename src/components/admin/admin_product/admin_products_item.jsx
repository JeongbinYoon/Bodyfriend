import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import styles from "./admin_product.module.css";
import { dbService } from "../../../service/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Admin_products_item = ({ item }) => {
  let createdDate = new Date(item.createdAt);
  createdDate =
    createdDate.getFullYear() +
    "-" +
    (createdDate.getMonth() + 1) +
    "-" +
    createdDate.getDate() +
    " " +
    createdDate.getHours() +
    ":" +
    createdDate.getMinutes();

  // 아이템 삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("해당 데이터를 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      const itemObj = doc(dbService, "chair", `${item.id}`);
      await deleteDoc(itemObj);
    }
  };

  return (
    <tr key={item.id}>
      <td className={styles.deletBtn}>
        <button onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faSquareMinus} />
        </button>
      </td>
      <td>
        <img width="30" src={item.item.imgURL} alt="productImg" />
      </td>
      <td className={styles.name}>{item.item.name}</td>
      <td>{item.item.price.toLocaleString()}</td>
      <td>{item.item.rentPrice.toLocaleString()}</td>
      <td className={styles.hide}>{createdDate}</td>
      <td className={styles.hide}>{item.creatorId}</td>
    </tr>
  );
};

export default Admin_products_item;
