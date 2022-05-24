import { Link } from "react-router-dom";
import Header from "../header/header";

const Main = ({ authService }) => {
  const onLogout = () => {
    console.log("로그아웃");
    authService.logout();
  };

  return (
    <>
      <Header title={"main"} />
      {onLogout && (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default Main;
