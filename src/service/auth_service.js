import firebase from "firebase/compat/app";
import firebaseApp from "./firebase";
import "firebase/compat/auth";

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    console.log("login");
    console.log(providerName);
    return firebaseApp.auth().signInWithRedirect(authProvider);
  }

  emailLogin(email, password) {
    console.log(email, password);
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  emailCreate(email, password) {
    console.log(`생성 ${(email, password)}`);
    return firebase.auth().createUserWithEmailAndPassword(email, password);
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
