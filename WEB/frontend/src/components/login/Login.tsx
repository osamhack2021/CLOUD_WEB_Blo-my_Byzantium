import React from "react";
import axios from "axios";
import LoginPresenter from "./LoginPresenter";
import {
  useAuthState,
  useAuthDispatch,
} from "../../utils/contexts/AuthContext";

export default function Login() {
  const authDispatch = useAuthDispatch();
  const handleSubmit = (loginInput: { username: string; password: string }) => {
    authDispatch({
      type: "LOGIN",
      username: loginInput.username,
      accessToken: "",
      isAuth: true,
    });
    window.localStorage.setItem("isAuth", JSON.stringify(true));
    /*
    axios({
      url: "https://osamhack2021-cloud-web-blo-my-byzantium-v5jxjj4w2qx5-8000.githubpreview.dev/account/login/",
      method: "post",
      headers: {
        "Content-Type": "text/plain",
      },
      data: {
        username: "20-12345677",
        password: "test123",
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        authDispatch({
          type: "LOGIN",
          username: loginInput.username,
          accessToken: "",
          isAuth: true,
        });
      }
    });
    */
  };
  return <LoginPresenter handleSubmit={handleSubmit} />;
}
