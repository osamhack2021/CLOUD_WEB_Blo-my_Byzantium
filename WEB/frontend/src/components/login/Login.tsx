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
        const authInfo = {
          name: res.data.name,
          rank: res.data.rank,
          isAuth: true,
        };
        authDispatch({
          type: "LOGIN",
          ...authInfo,
        });
        window.localStorage.setItem("authInfo", JSON.stringify(authInfo));
      })
      .catch(() => {
        setIsError(true);
      });
  };
  return <LoginPresenter isError={isError} handleSubmit={handleSubmit} />;
}
