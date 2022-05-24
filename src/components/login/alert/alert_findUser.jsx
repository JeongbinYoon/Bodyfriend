import React, { useRef, useState } from "react";
import styles from "./alert.module.css";

const Alert_findUser = ({ onCancelBtnClick, authService }) => {
  const emailInput = useRef();
  const [sendEmail, setSendEmail] = useState(false);

  const handleCancelBtnClick = () => {
    onCancelBtnClick();
  };

  const onResetEmail = () => {
    authService //
      .resetEmail(emailInput.current.value)
      .then((data) => {
        setSendEmail(true);
        // goToHome(data.user.uid);
      });
  };

  return (
    <div className={styles.alert}>
      <div className={styles.bg}></div>

      <div className={styles.alertBox}>
        <header>
          <h2>계정찾기</h2>
        </header>
        <div className={styles.body}>
          {!sendEmail && (
            <input ref={emailInput} type="email" placeholder="이메일 입력" />
          )}
          {sendEmail && <p>이메일을 전송하였습니다.</p>}
        </div>
        <footer>
          {!sendEmail && (
            <button className={styles.findBtn} onClick={onResetEmail}>
              찾기
            </button>
          )}
          <button className={styles.cancleBtn} onClick={handleCancelBtnClick}>
            {!sendEmail && "취소"}
            {sendEmail && "확인"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Alert_findUser;
