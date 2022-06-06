import React, { useRef, useState, useEffect } from "react";
import Header_admin from "../header/header_admin";
import Admin_product from "./admin_product/admin_product";
import Admin_order from "./admin_order/admin_order";
import Admin_rental from "./admin_rental/admin_rental";
import styles from "./admin.module.css";
import Sidebar from "./sidebar/sidebar";

const Admin = ({ authService }) => {
  const [userId, setUserID] = useState("");
  const [nickname, setNickname] = useState("");
  const [sidebarIsClicked, setSidebarIsClicked] = useState(false);
  const [menuTarget, setMenuTarget] = useState("product");
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        console.log(user);
        setUserID(user.uid);
        setNickname(user.email.split("@")[0]);
      } else {
        setUserID(null);
      }
    });
  });

  const handleSidebarClicked = (isClicked) => {
    setSidebarIsClicked(isClicked);
  };

  const handleCloseSidebar = (close) => {
    setSidebarIsClicked(close);
  };

  const handleShowWhat = (e) => {
    const target = e.currentTarget.dataset.menu;
    setMenuTarget(target);
  };

  const showComponent = () => {
    if (menuTarget === "product") {
      let header = (
        <Header_admin
          key={menuTarget}
          title={"제품"}
          onSidebarClicked={handleSidebarClicked}
        />
      );
      let component = <Admin_product key={menuTarget + " "} userId={userId} />;
      return [header, component];
    } else if (menuTarget === "order") {
      let header = (
        <Header_admin
          key={menuTarget}
          title={"주문"}
          onSidebarClicked={handleSidebarClicked}
        />
      );
      let component = <Admin_order key={menuTarget + " "} />;
      return [header, component];
    } else if (menuTarget === "rental") {
      let header = (
        <Header_admin
          key={menuTarget}
          title={"렌탈상담신청"}
          onSidebarClicked={handleSidebarClicked}
        />
      );
      let component = <Admin_rental key={menuTarget + " "} />;
      return [header, component];
    }
  };
  return (
    <div className={styles.admin}>
      <Sidebar
        onSidebarClicked={sidebarIsClicked}
        onCloseSidebar={handleCloseSidebar}
        authService={authService}
        nickname={nickname}
        onShowWhat={handleShowWhat}
      />
      {showComponent()}
    </div>
  );
};

export default Admin;
