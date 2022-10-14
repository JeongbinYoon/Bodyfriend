import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import Admin from "./components/admin/admin";
import Admin_order from "./components/admin/admin_order/admin_order";
import CreateUser from "./components/login/createUser";
import Login from "./components/login/login";
import Main from "./components/main/main";
import Mypage from "./components/mypage/mypage";
import Product_detail from "./components/product_detail/product_detail";
import Product_order from "./components/product_order/product_order";

function App({ authService }) {
  return (
    <div className={styles.app}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Main authService={authService} />} />
          <Route
            exact
            path="/login"
            element={<Login authService={authService} />}
          />
          <Route
            exact
            path="/mypage"
            element={<Mypage authService={authService} />}
          />
          <Route
            exact
            path="/createUser"
            element={<CreateUser authService={authService} />}
          />
          <Route
            exact
            path="/product/productDetail"
            element={<Product_detail authService={authService} />}
          />
          <Route
            exact
            path="/product/productOrder"
            element={<Product_order authService={authService} />}
          />
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
