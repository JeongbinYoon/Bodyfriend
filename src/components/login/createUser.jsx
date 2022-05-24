import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/header";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const CreateUser = ({ authService }) => {
  const emailInput = useRef();
  const pwInput = useRef();

  const navigate = useNavigate();
  const goToHome = (userId) => {
    navigate({
      pathname: "/",
      state: { id: userId },
    });
  };

  // 회원가입
  const onEmailCreate = (event) => {
    event.preventDefault();
    authService //
      .emailCreate(emailInput.current.value, pwInput.current.value)
      .then((data) => {
        console.log(data);
        goToHome(data.user.uid);
      });
  };

  return (
    <div className={styles.login}>
      <Header title={"회원가입"} />
      <form>
        <div className={styles.login_id}>
          <input ref={emailInput} type="email" placeholder="아이디" />
          <FontAwesomeIcon className={styles.id_icon} icon={faEnvelope} />
        </div>
        <div className={styles.login_pw}>
          <input ref={pwInput} type="password" placeholder="비밀번호" />
          <FontAwesomeIcon className={styles.pw_icon} icon={faLock} />
        </div>
        <button onClick={onEmailCreate} className={styles.loginBtn}>
          가입하기
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
