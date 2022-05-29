import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header_admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const HeaderMain = () => {
  let navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <button>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h1 className={styles.title}>상품</h1>
      <button onClick={goToHome}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </header>
  );
};

export default HeaderMain;
