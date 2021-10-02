import React from "react";
import Logo from "../images/logo.png";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "1em",
        marginRight: "1em",
      }}
    >
      <img src={Logo} alt="Logo" style={{ height: "100px" }} />
      {/* Hard Coded -- Should be Changed */}
      <div
        style={{
          fontSize: "2.5em",
          lineHeight: "100px",
        }}
      >
        OOO 상병님
      </div>
    </div>
  );
}
