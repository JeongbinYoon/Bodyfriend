import { HashRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import Admin from "./components/admin/admin";
import Admin_order from "./components/admin/admin_order/admin_order";
import CreateUser from "./components/login/createUser";
import Login from "./components/login/login";
import Main from "./components/main/main";
import MyOrder from "./components/mypage/myorder/myorder";
import Mypage from "./components/mypage/mypage";
import ProductDetail from "./components/product_detail/product_detail";
import ProductOrder from "./components/product_order/product_order";
import ProductLists from "./components/product_lists/product_lists";
import FindStore from "./components/findStore/findStore";
import Introduce from "./components/introduce/introduce";

function App({ authService }) {
  return (
    <div className={styles.app}>
      {/* <Router basename={process.env.PUBLIC_URL}> */}
      <Router>
        <Routes>
          <Route path="/introduce" element={<Introduce />} />
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

          <Route
            exact
            path="/product/productLists"
            element={<ProductLists authService={authService} />}
          />
          <Route
            exact
            path="/product/productDetail"
            element={<ProductDetail authService={authService} />}
          />
          <Route
            exact
            path="/product/productOrder"
            element={<ProductOrder authService={authService} />}
          />

          <Route
            exact
            path="/mypage"
            element={<Mypage authService={authService} />}
          />
          <Route
            exact
            path="/myorder"
            element={<MyOrder authService={authService} />}
          />

          <Route exact path="/branchStore" element={<FindStore />} />

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
