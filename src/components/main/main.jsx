import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HeaderMain from "../header/header_main";
import Main_friendmall from "./main_friendmall";
import Banner from "../banner/banner";
import { dbService } from "../../service/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Main = ({ authService }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log(userData);
    setUserInfo(userData.userInfo);
  }, [userData]);

  const onLogout = () => {
    console.log("로그아웃");
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setLoggedIn(true);
        setUserId(user.uid);
        getUserData(user);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const getUserData = async (user) => {
    const userDocRef = doc(dbService, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    docSnap && setUserData(docSnap.data());
  };

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
                <span className={styles.userName}>
                  {userInfo && userInfo.name}
                </span>
                님
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
        <Main_friendmall userInfo={userInfo} />
      </div>
    </>
  );
};

export default Main;
