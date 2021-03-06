import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header_admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const HeaderMain = ({ title, onSidebarClicked }) => {
  let navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const handleSidebarClicked = () => {
    onSidebarClicked(true);
  };

  return (
    <header className={styles.header}>
      <button onClick={handleSidebarClicked}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h1 className={styles.title}>{title}</h1>
      <button onClick={goToHome}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </header>
  );
};

export default HeaderMain;
