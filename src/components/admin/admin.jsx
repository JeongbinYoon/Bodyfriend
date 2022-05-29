import React, { useRef, useState, useEffect } from "react";
import Header_admin from "../header/header_admin";
import Admin_product from "./admin_product";
import styles from "./admin.module.css";

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

  return (
    <div className={styles.admin}>
      <Header_admin title={"상품"} />
      <Admin_product userId={userId} />
    </div>
  );
};

export default Admin;
