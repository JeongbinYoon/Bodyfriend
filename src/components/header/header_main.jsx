import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header_main.module.css";

const HeaderMain = () => {
  let navigate = useNavigate();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <img src="./images/bf_logo.png" alt="logo" />
      </h1>
    </header>
  );
};

export default HeaderMain;
