import React, { useRef, useState, useEffect } from "react";
import Header_admin from "../header/header_admin";
import Admin_product from "./admin_product";
import styles from "./admin.module.css";
import Sidebar from "./sidebar/sidebar";

const Admin = ({ authService }) => {
  const [userId, setUserID] = useState("");
  const [sidebarIsClicked, setSidebarIsClicked] = useState(false);
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

  const handleSidebarClicked = (isClicked) => {
    console.log(isClicked);
    setSidebarIsClicked(isClicked);
  };

  const handleCloseSidebar = (close) => {
    setSidebarIsClicked(close);
  };

  return (
    <div className={styles.admin}>
      <Sidebar
        onSidebarClicked={sidebarIsClicked}
        onCloseSidebar={handleCloseSidebar}
      />
      <Header_admin title={"제품"} onSidebarClicked={handleSidebarClicked} />
      <Admin_product userId={userId} />
    </div>
  );
};

export default Admin;
