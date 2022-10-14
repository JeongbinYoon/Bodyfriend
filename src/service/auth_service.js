import firebase from "firebase/compat/app";
import firebaseApp from "./firebase";
import "firebase/compat/auth";

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    console.log("login");
    console.log(providerName);
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  emailLogin(email, password) {
    console.log(email, password);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        console.log("로그인 성공");
      })
      .catch(function (error) {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case "auth/user-not-found":
            throw new Error("사용자 계정이 없습니다.");
          case "auth/invalid-email": {
            throw new Error("유효하지 않은 이메일 형식입니다.");
          }
          case "auth/internal-error": {
            throw new Error("값을 모두 입력하세요.");
          }
          case "auth/wrong-password": {
            throw new Error("비밀번호가 틀렸습니다.");
          }
          default:
            throw new Error("로그인 에러. 잠시 후 다시 이용하세요.");
        }
      });
  }

  emailCreate(email, password) {
    console.log(`생성 ${(email, password)}`);
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  resetEmail(email) {
    console.log(`이 이메일로 ${email}`);
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        // Password reset email sent.
        console.log("email 전송");
      })
      .catch(function (error) {
        // Error occurred. Inspect error.code.
      });
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  logout() {
    firebaseApp.auth().signOut();
    console.log("logout");
  }
}

export default AuthService;
