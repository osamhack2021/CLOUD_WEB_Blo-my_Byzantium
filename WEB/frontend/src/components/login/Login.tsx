import React from "react";
import LoginPresenter from "./LoginPresenter";
import {
  useAuthState,
  useAuthDispatch,
} from "../../utils/contexts/AuthContext";

export default function Login() {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const handleSubmit = (loginInput: { username: string; password: string }) => {
    authDispatch({
      type: "LOGIN",
      username: loginInput.username,
      accessToken: "",
      isAuth: true,
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
