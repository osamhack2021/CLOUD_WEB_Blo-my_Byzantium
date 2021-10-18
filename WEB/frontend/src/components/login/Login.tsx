import React, { useState } from "react";
import LoginPresenter from "./LoginPresenter";
import { useAuthDispatch } from "../../utils/contexts/AuthContext";
import api from "../../utils/api";

export default function Login() {
  const [isError, setIsError] = useState(false);
  const authDispatch = useAuthDispatch();
  const handleSubmit = (loginInput: { username: string; password: string }) => {
    api
      .post("/account/login/", {
        ...loginInput,
      })
      .then((res) => {
        setIsError(false);
        authDispatch({
          type: "LOGIN",
          username: loginInput.username,
          accessToken: "",
          isAuth: true,
        });
        window.localStorage.setItem("isAuth", JSON.stringify(true));
      })
      .catch(() => {
        setIsError(true);
      });
  };
  return <LoginPresenter isError={isError} handleSubmit={handleSubmit} />;
}
