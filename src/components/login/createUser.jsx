import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { dbService } from "../../service/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Alert from "../../common/alert/alert";

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
  // 회원가입 에러 알림
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleCheckAlert = (bool) => {
    setIsAlert(false);
  };

  // 유효성 검사
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleValid = ({ username, number, email, password }) => {
    onEmailCreate(username, number, email, password);
  };

  // 회원가입 진행
  const onEmailCreate = (username, number, email, password) => {
    console.log(email);
    console.log(password);
    authService //
      .emailCreate(email, password)
      .then(async (data) => {
        console.log(data);
        await setUserData(data, username, number);
        goToHome(username, number);
      })
      .catch((error) => {
        console.log(error.message);
        setAlertMessage(error.message);
        setIsAlert(true);
      });
  };

  // 회원가입 시 사용자 데이터 등록
  const setUserData = async (data, username, number) => {
    const userInfo = {
      userId: data.user.uid,
      name: data.user.displayName,
      mail: data.user.email,
      number: data.user.phoneNumber,
    };
    if (userInfo.name === null) {
      userInfo.name = username;
    }
    if (userInfo.number === null) {
      userInfo.number = number;
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
    <>
      <Header title={"회원가입"} />
      <div className={styles.login}>
        <form onSubmit={handleSubmit(handleValid)}>
          {/* 이름 */}
          <div className={styles.login_name}>
            <input
              ref={nameInput}
              type="text"
              placeholder="이름"
              {...register("username", {
                required: "이름을 입력하세요.",
                pattern: {
                  value: /^[가-힣]{2,4}|[a-zA-Z]{2,10}$/,
                  message:
                    "한글 이름 2~4자, 영문이름 2~10자 형식으로 입력해주세요.",
                },
              })}
            />
            <FontAwesomeIcon className={styles.name_icon} icon={faUser} />
          </div>
          {errors.username && (
            <span className={styles.errorMessage}>
              {errors.username.message}
            </span>
          )}

          {/* 전화번호 */}
          <div className={styles.login_number}>
            <input
              ref={numberInput}
              type="text"
              placeholder="- 를 포함한 전화번호"
              {...register("number", {
                required: "전화번호를 입력하주세요.",
                minLength: {
                  value: 12,
                  message: "전화번호를 정확히 입력해주세요.",
                },
                maxLength: {
                  value: 13,
                  message: "전화번호를 정확히 입력해주세요.",
                },
                pattern: {
                  value: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/,
                  message:
                    "숫자, -를 포함하여 전화번호 형식에 맞게 입력해주세요.",
                },
              })}
            />
            <FontAwesomeIcon className={styles.number_icon} icon={faPhone} />
          </div>
          {errors.number && (
            <span className={styles.errorMessage}>{errors.number.message}</span>
          )}

          {/* 이메일 */}
          <div className={styles.login_id}>
            <input
              ref={emailInput}
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                  message: "이메일 형식이 맞지 않습니다.",
                },
              })}
            />
            <FontAwesomeIcon className={styles.id_icon} icon={faEnvelope} />
          </div>
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}

          {/* 비밀번호 */}
          <div className={styles.login_pw}>
            <input
              ref={pwInput}
              type="password"
              placeholder="영문과 숫자를 포함 8~16자"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                  message: "영문, 숫자를 혼용하여 입력해주세요.",
                },
                minLength: {
                  value: 8,
                  message: "최소 8자리를 입력해주세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하의 비밀번호만 사용가능합니다.",
                },
              })}
            />
            <FontAwesomeIcon className={styles.pw_icon} icon={faLock} />
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}

          {/* 비밀번호 */}
          <div className={styles.login_pw}>
            <input
              ref={pwInput}
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordCheck", {
                required: "비밀번호를 다시 입력하세요.",
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            <FontAwesomeIcon className={styles.pw_icon} icon={faLock} />
          </div>
          {errors.passwordCheck && (
            <span className={styles.errorMessage}>
              {errors.passwordCheck.message}
            </span>
          )}

          {/* 가입하기 버튼 */}
          <input
            type="submit"
            // onClick={onEmailCreate}
            className={styles.loginBtn}
            value="가입하기"
          />
        </form>
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

export default CreateUser;
