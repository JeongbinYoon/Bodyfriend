import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ title }) => {
  let navigate = useNavigate();

  return (
    <header className={styles.header}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={styles.icon}
        onClick={() => {
          navigate(-1);
        }}
      />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;
