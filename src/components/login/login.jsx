import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ authService }) => {
  const navigate = useNavigate();
  const goToHome = (userId) => {
    navigate({
      pathname: "/",
      state: { id: userId },
    });
  };
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => {
        console.log(data);
        goToHome(data.user.uid);
      });
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToHome(user.uid);
    });
  });
  return (
    <>
      <h1>로그인</h1>
      <button onClick={onLogin}>Google</button>
    </>
  );
};

export default Login;
