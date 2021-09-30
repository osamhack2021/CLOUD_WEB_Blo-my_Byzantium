import React from "react";
import axios from "axios";
import LoginPresenter from "./LoginPresenter";
import {
  useAuthState,
  useAuthDispatch,
} from "../../utils/contexts/AuthContext";

const loginRequest = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "plain/text",
  },
});
export default function Login() {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const handleSubmit = (loginInput: { username: string; password: string }) => {
    loginRequest
      .post("/account/login", {
        username: loginInput.username,
        password: loginInput.password,
      })
      .then((res) => {
        if (res.status === 200) {
          authDispatch({
            type: "LOGIN",
            username: loginInput.username,
            accessToken: "",
            isAuth: true,
          });
        }
      });
  };
  return authState.isAuth ? (
    <div>{`${authState.username}`}</div>
  ) : (
    <div>
      <LoginPresenter handleSubmit={handleSubmit} />
    </div>
  );
}
