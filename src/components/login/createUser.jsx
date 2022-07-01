import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/header";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "../../service/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CreateUser = ({ authService }) => {
  const nameInput = useRef();
  const numberInput = useRef();
  const emailInput = useRef();
  const pwInput = useRef();

  const navigate = useNavigate();
  const goToHome = (userName, userNumber) => {
    navigate("/", {
      state: {
        userName,
        userNumber,
      },
    });
  };

  // 회원가입
  const onEmailCreate = (event) => {
    event.preventDefault();

    authService //
      .emailCreate(emailInput.current.value, pwInput.current.value)
      .then(async (data) => {
        console.log(data);
        await setUserData(data);
        goToHome(nameInput.current.value, numberInput.current.value);
        console.log(nameInput.current.value);
      });
  };

  // 회원가입 시 사용자 데이터 등록
  const setUserData = async (data) => {
    const userInfo = {
      userId: data.user.uid,
      name: data.user.displayName,
      mail: data.user.email,
      number: data.user.phoneNumber,
    };
    if (userInfo.name === null) {
      userInfo.name = nameInput.current.value;
    }
    if (userInfo.number === null) {
      userInfo.number = numberInput.current.value;
    }
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
    <div className={styles.login}>
      <Header title={"회원가입"} />
      <form>
        <div className={styles.login_name}>
          <input ref={nameInput} type="text" placeholder="이름" />
          <FontAwesomeIcon className={styles.name_icon} icon={faEnvelope} />
        </div>
        <div className={styles.login_number}>
          <input ref={numberInput} type="number" placeholder="전화번호" />
          <FontAwesomeIcon className={styles.number_icon} icon={faEnvelope} />
        </div>
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
