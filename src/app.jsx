import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import Admin from "./components/admin/admin";
import Admin_order from "./components/admin/admin_order/admin_order";
import CreateUser from "./components/login/createUser";
import Login from "./components/login/login";
import Main from "./components/main/main";
import Rent from "./components/rent/rent";

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
          <Route
            exact
            path="/createUser"
            element={<CreateUser authService={authService} />}
          />
          <Route exact path="/rent" element={<Rent />} />
          <Route
            exact
            path="/admin"
            element={<Admin authService={authService} />}
          />
          <Route path="/admin/order" element={<Admin_order />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
