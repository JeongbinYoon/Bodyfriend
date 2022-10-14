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
import { dbService } from "../../service/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Alert from "../../common/alert/alert";

const Login = ({ authService }) => {
  const emailInput = useRef();
  const pwInput = useRef();
  const [isCancelBtnClicked, setCancelBtnClicked] = useState(false);

  const handleCancelBtnClick = () => {
    setCancelBtnClicked(false);
  };

  const navigate = useNavigate();
  const goToHome = (userId, displayName, photoURL) => {
    navigate("/", {
      state: {
        id: userId,
        name: displayName,
        profileImg: photoURL,
      },
    });
  };

  // alert
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleCheckAlert = (bool) => {
    setIsAlert(false);
  };

  // 이메일 로그인
  const onEmailLogin = (event) => {
    event.preventDefault();
    authService //
      .emailLogin(emailInput.current.value, pwInput.current.value)
      .then((data) => {
        console.log(data);
        let name = data.user.email.split("@")[0];
        setUserData(data);
        goToHome(data.user.uid, name, data.user.photoURL);
      })
      // 에러처리: auth_service에서 던진 에러
      .catch(function (error) {
        console.log(error.message);
        setAlertMessage(error.message);
        setIsAlert(true);
      });
  };

  // SNS 로그인
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.dataset.snstype)
      .then((data) => {
        setUserData(data);
        goToHome(data.user.uid, data.user.displayName, data.user.photoURL);
      });
  };

  // 로그인 시 사용자 데이터 등록
  const setUserData = async (data) => {
    const userInfo = {
      userId: data.user.uid,
      name: data.user.displayName,
      mail: data.user.email,
      number: data.user.phoneNumber,
    };
    const userDocRef = doc(dbService, "users", data.user.uid);
    const docSnap = await getDoc(userDocRef);

    // 등록된 사용자일 경우 초기값 지정 X
    if (docSnap.exists() && docSnap.id !== null) {
      console.log("데이터 존재");
      return;
    } else {
      await setDoc(doc(dbService, "users", data.user.uid), {
        userInfo,
        orderList: [],
      });
    }
  };

  return (
    <>
      <Header title={"로그인"} />
      <div className={styles.login}>
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
        <img className={styles.logo} src="./images/bf_logo.png" alt="logo" />
        {isCancelBtnClicked && (
          <Alert_findUser
            onCancelBtnClick={handleCancelBtnClick}
            authService={authService}
          />
        )}
      </div>
      {isAlert && (
        <Alert
          onCheckAlert={handleCheckAlert}
          title="알림"
          content={alertMessage}
          btnName="확인"
        />
      )}
    </>
  );
};

export default Login;
