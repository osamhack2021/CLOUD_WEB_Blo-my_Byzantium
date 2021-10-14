import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAuthDispatch } from "../utils/contexts/AuthContext";
import Logo from "../images/logo.png";

export default function Header() {
  const history = useHistory();
  const authDispatch = useAuthDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        alignItems: "center",
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
      <Button
        style={{
          fontSize: "1em",
          fontWeight: "bold",
          height: "fit-content",
          padding: "0px",
          color: "black",
        }}
        onClick={handleClick}
      >
        OOO 상병님
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            authDispatch({
              type: "LOGOUT",
            });
          }}
        >
          로그아웃
        </MenuItem>
        <MenuItem onClick={() => history.push("/firearm-accept-update")}>
          총기 최신화 승인 대기 목록
        </MenuItem>
        <MenuItem onClick={() => history.push("/fooddata-accept-update")}>
          부식작전 최신화 승인 대기 목록
        </MenuItem>
      </Menu>
    </div>
  );
}
