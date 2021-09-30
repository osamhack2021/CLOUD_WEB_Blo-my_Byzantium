import React from "react";
import Login from "../components/login/Login";
import Logo from "../images/logo.png";

export default function LoginPage() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
      }}
    >
      <img src={Logo} alt="Logo" style={{ width: "100%" }} />
      <Login />
    </div>
  );
}
