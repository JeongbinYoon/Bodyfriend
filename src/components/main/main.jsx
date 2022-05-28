import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HeaderMain from "../header/header_main";
import { dbService } from "../../service/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import Main_friendmall from "./main_friendmall";

const Main = ({ authService }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // 의자 데이터 로드
  const [chairs, setChairs] = useState("");
  const getChairs = async () => {
    const q = query(collection(dbService, "chair"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const chairObj = {
        ...doc.data(),
        id: doc.id,
      };
      setChairs((prev) => [chairObj, ...prev]);
    });
  };

  useEffect(() => {
    getChairs();
  }, []);

  const onLogout = () => {
    console.log("로그아웃");
    authService.logout();
  };

  // useEffect(() => {
  //   authService.onAuthChange((user) => {
  //     if (user) {
  //       // console.log(user);
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //     }
  //   });
  // });

  // const location = useLocation();
  // console.log("state", location.state);

  console.log(chairs);
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

        {chairs && <Main_friendmall chairs={chairs} />}
      </div>
    </>
  );
};

export default Main;
