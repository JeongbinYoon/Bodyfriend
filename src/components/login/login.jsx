import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faApple,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const Login = ({ authService }) => {
  const navigate = useNavigate();
  const goToHome = (userId) => {
    navigate({
      pathname: "/",
      state: { id: userId },
    });
  };
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.dataset.snstype)
      .then((data) => {
        console.log(data);
        goToHome(data.user.uid);
      });
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToHome(user.uid);
    });
  });
  return (
    <div className={styles.login}>
      <Header title={"로그인"} />
      <form>
        <div className={styles.login_id}>
          <input type="email" placeholder="아이디" />
          <FontAwesomeIcon className={styles.id_icon} icon={faEnvelope} />
        </div>
        <div className={styles.login_pw}>
          <input type="password" placeholder="비밀번호" />
          <FontAwesomeIcon className={styles.pw_icon} icon={faLock} />
        </div>
        <button className={styles.loginBtn}>로그인</button>
      </form>

      <div className={styles.sub}>
        <a href="#">
          <span>아이디 / 비밀번호 찾기</span>
        </a>
        <a href="#">
          <span>회원가입</span>
        </a>
      </div>

      <div className={styles.sns}>
        <button onClick={onLogin} data-snstype="Facebook">
          <FontAwesomeIcon
            className={`${styles.sns_icon} ${styles.facebook}`}
            icon={faFacebookF}
          />
        </button>
        <button onClick={onLogin} data-snstype="Apple">
          <FontAwesomeIcon
            className={`${styles.sns_icon} ${styles.apple}`}
            icon={faApple}
          />
        </button>
        <button onClick={onLogin} data-snstype="Google">
          <FontAwesomeIcon
            className={`${styles.sns_icon} ${styles.google}`}
            icon={faGoogle}
          />
        </button>
      </div>

      <img
        className={styles.logo}
        src="./images/login/bf_logo.png"
        alt="logo"
      />
    </div>
  );
};

export default Login;
