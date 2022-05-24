import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import Login from "./components/login/login";
import Main from "./components/main/main";

function App({ authService }) {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main authService={authService} />} />
          <Route
            exact
            path="/login"
            element={<Login authService={authService} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
