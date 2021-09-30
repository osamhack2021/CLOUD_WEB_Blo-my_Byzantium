import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type props = {
  handleSubmit: (loginInput: { username: string; password: string }) => void;
};

export default function LoginPresenter({ handleSubmit }: props) {
  const [loginInput, setLoginInput] = useState({ username: "", password: "" });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(loginInput);
  };
  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({
      ...loginInput,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        name="username"
        type="text"
        value={loginInput.username}
        placeholder="아이디를 입력하시오"
        onChange={updateField}
        style={{ marginTop: "1em" }}
      />
      <TextField
        name="password"
        type="password"
        value={loginInput.password}
        placeholder="비밀번호를 입력하시오"
        onChange={updateField}
        style={{ marginTop: "1em" }}
      />
      <Button type="submit" style={{ marginTop: "1em" }}>
        로그인
      </Button>
    </form>
  );
}
