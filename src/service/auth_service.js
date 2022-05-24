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
