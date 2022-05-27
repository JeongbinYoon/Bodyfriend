import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HeaderMain from "../header/header_main";

const Main = ({ authService }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const onLogout = () => {
    console.log("로그아웃");
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && setLoggedIn(true);
      !user && setLoggedIn(false);
    });
  });

  const location = useLocation();
  console.log("state", location.state);

  return (
    <>
      <HeaderMain />
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
            <div></div>
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
      </div>
    </>
  );
};

export default Main;
