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
      <div className={styles.main}>
        <HeaderMain authService={authService} />
        <div className={styles.section}>
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
            </>
          )}
          <Banner />
          <Main_friendmall userInfo={userInfo} type="chair" />
          <Main_friendmall userInfo={userInfo} type="waterPurifier" />
        </div>
      </div>
      <div className={styles.notice}>
        <div className={styles.alert}>
          <p>브라우저 창을 모바일 화면 크기로 줄여주세요</p>
          <img src="./images/qrcode.png" alt="qr코드" />
          <span className={styles.caption}>스마트폰 접속 QR코드</span>
        </div>
      </div>
    </>
  );
};

export default Main;
