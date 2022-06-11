import React from "react";
import styles from "./alert.module.css";

const Alert = ({ onCheckAlert, title, content, btnName }) => {
  const handleCheckAlert = () => {
    onCheckAlert(true);
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
