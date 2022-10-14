import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./alert.module.css";

const Alert = ({ onCheckAlert, title, content, btnName, path }) => {
  const navigate = useNavigate();
  const goTo = () => {
    navigate(path);
  };

  const handleCheckAlert = () => {
    onCheckAlert();
    path && goTo();
  };

  return (
    <div className={styles.alert}>
      <div className={styles.bg}></div>

      <div className={styles.alertContainer}>
        <header className={styles.alertHeader}>{title}</header>
        <div className={styles.alertBody}>{content}</div>
        <footer className={styles.alertFooter}>
          <button onClick={handleCheckAlert} className={styles.check}>
            {btnName}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Alert;
