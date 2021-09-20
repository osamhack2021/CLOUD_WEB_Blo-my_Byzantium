import React, { useState } from "react";

type props = {
  handleSubmit: (loginInput: { username: string; password: string }) => void;
};

export default function LoginPresenter({ handleSubmit }: props) {
  const [loginInput, setLoginInput] = useState({ username: "", password: "" });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(loginInput);
  };
  const updateField = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginInput({
      ...loginInput,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        type="text"
        value={loginInput.username}
        placeholder="아이디를 입력하시오"
        onChange={updateField}
      />
      <input
        name="password"
        type="password"
        value={loginInput.password}
        placeholder="비밀번호를 입력하시오"
        onChange={updateField}
      />
      <button type="submit">로그인</button>
    </form>
  );
}
