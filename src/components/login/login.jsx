import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/header";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import Alert_findUser from "./alert/alert_findUser";

const Login = ({ authService }) => {
  const emailInput = useRef();
  const pwInput = useRef();
  const [isCancelBtnClicked, setCancelBtnClicked] = useState(false);

  const handleCancelBtnClick = () => {
    setCancelBtnClicked(false);
  };

  const navigate = useNavigate();
  const goToHome = (userId) => {
    navigate({
      pathname: "/",
      state: { id: userId },
    });
  };

  // 이메일 로그인
  const onEmailLogin = (event) => {
    event.preventDefault();
    authService //
      .emailLogin(emailInput.current.value, pwInput.current.value)
      .then((data) => {
        console.log(data);
        goToHome(data.user.uid);
      });
  };

  // SNS 로그인
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
          <input ref={emailInput} type="email" placeholder="아이디" />
          <FontAwesomeIcon className={styles.id_icon} icon={faEnvelope} />
        </div>
        <div className={styles.login_pw}>
          <input ref={pwInput} type="password" placeholder="비밀번호" />
          <FontAwesomeIcon className={styles.pw_icon} icon={faLock} />
        </div>
        <button onClick={onEmailLogin} className={styles.loginBtn}>
          로그인
        </button>
      </form>
      <div className={styles.sub}>
        <a href="#">
          <span onClick={() => setCancelBtnClicked(true)}>계정찾기</span>
        </a>
        <Link to="/createUser">
          <span>회원가입</span>
        </Link>
      </div>
      <div className={styles.sns}>
        <button onClick={onLogin} data-snstype="Facebook">
          <FontAwesomeIcon
            className={`${styles.sns_icon} ${styles.facebook}`}
            icon={faFacebookF}
          />
        </button>
        <button onClick={onLogin} data-snstype="Twitter">
          <FontAwesomeIcon
            className={`${styles.sns_icon} ${styles.twitter}`}
            icon={faTwitter}
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
      {isCancelBtnClicked && (
        <Alert_findUser
          onCancelBtnClick={handleCancelBtnClick}
          authService={authService}
        />
      )}
    </div>
  );
};

export default Login;
