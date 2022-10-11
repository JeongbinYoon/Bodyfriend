import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header_main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Alert from "../product_order/alert/alert";

const HeaderMain = ({ authService }) => {
  let navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setLoggedIn(true);
        if (user.displayName) {
          setUserName(user.displayName);
        } else {
          setUserName(user.email.split("@")[0]);
        }
      } else {
        setLoggedIn(false);
      }
    });
  });

  const goToMypage = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      setIsAlert(true);
    }
  };

  //   알림
  const [alertType, setAlertType] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const handleCheckAlert = () => {
    setIsAlert(false);
  };

  const popupAlert = (title, content, btnName, path) => {
    return (
      <Alert
        title={title}
        content={content}
        btnName={btnName}
        onCheckAlert={handleCheckAlert}
        path={path}
      />
    );
  };

  const onLogout = () => {
    console.log("로그아웃");
    authService.logout();
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <img src="./images/bf_logo.png" alt="logo" />
        </h1>
        <div className={styles.headerIcon}>
          {isLoggedIn && (
            <button
              className={styles.logoutBtn}
              onClick={() => {
                onLogout();
                setLoggedIn(true);
              }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          )}
          <FontAwesomeIcon
            className={styles.myPageIcon}
            icon={faUser}
            onClick={goToMypage}
          />
        </div>
      </header>
      {isAlert && popupAlert("알림", "로그인이 필요합니다.", "확인", "/login")}
    </>
  );
};

export default HeaderMain;
