import { Link } from "react-router-dom";

const Main = ({ authService }) => {
  const onLogout = () => {
    console.log("로그아웃");
    authService.logout();
  };

  return (
    <>
      <h1>main</h1>
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
