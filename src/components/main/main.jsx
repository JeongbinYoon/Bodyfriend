import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HeaderMain from "../header/header_main";
import Main_friendmall from "./main_friendmall";
import Banner from "../banner/banner";

const Main = ({ authService }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const onLogout = () => {
    console.log("로그아웃");
    authService.logout();
  };

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

  return (
    <>
      <HeaderMain authService={authService} />
      <div className={styles.main}>
        {!isLoggedIn && (
          <div className={styles.logInContainer}>
            <Link to="/login">
              <div className={styles.logInBtn}>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className={styles.userIcon}
                />
                <h2>
                  <span>로그인</span>해 주세요
                </h2>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.nextIcon}
                />
              </div>
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <>
            <div className={styles.userInfo}>
              <span>
                <span className={styles.userName}>{userName}</span>님
              </span>
              <span className={styles.time}>
                사용시간 <span className={styles.timeVal}>0</span>분
              </span>
            </div>
            <button
              onClick={() => {
                onLogout();
                setLoggedIn(true);
              }}
            >
              Logout
            </button>
          </>
        )}
        <Banner />
        <Main_friendmall />
      </div>
    </>
  );
};

export default Main;
