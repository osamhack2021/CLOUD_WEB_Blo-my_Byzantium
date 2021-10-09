import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../images/logo.png";

export default function Header() {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        paddingLeft: "1em",
        paddingRight: "1em",
        backgroundColor: "#eae7ed",
        borderBottom: "1px solid gray",
      }}
    >
      <button
        type="button"
        style={{ border: "0" }}
        onClick={() => history.push("/")}
      >
        <img src={Logo} alt="Logo" style={{ height: "70px" }} />
      </button>
      {/* Hard Coded -- Should be Changed */}
      <div
        style={{
          // fontSize: "2.5em",
          lineHeight: "70px",
        }}
      >
        OOO 상병님
      </div>
    </div>
  );
}
