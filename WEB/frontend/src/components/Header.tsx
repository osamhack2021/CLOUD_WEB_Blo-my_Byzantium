import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../utils/contexts/AuthContext";
import Logo from "../images/logo.png";

export default function Header() {
  const { name, rank } = useAuthState();
  const history = useHistory();
  const authDispatch = useAuthDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuclose = () => {
    setAnchorEl(null);
  };
  const handleLogoButtonClick = () => history.push("/");
  const menuItems = [
    {
      label: "총기 최신화 승인 대기 목록",
      onClick: () => history.push("/firearm-accept-update"),
    },
    {
      label: "부식작전 최신화 승인 대기 목록",
      onClick: () => history.push("/fooddata-accept-update"),
    },
    {
      label: "로그아웃",
      onClick: () => {
        authDispatch({
          type: "LOGOUT",
        });
        window.localStorage.removeItem("isAuth");
      },
    },
  ];
  return (
    <div className="header">
      <IconButton type="button" onClick={handleLogoButtonClick}>
        <img src={Logo} alt="Logo" />
      </IconButton>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="header-user">{`${name} ${rank}님`}</div>
        <IconButton type="button" onClick={handleMenuClick}>
          <PersonOutlineIcon />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuclose}
      >
        {menuItems.map((e) => (
          <MenuItem
            key={JSON.stringify(e)}
            onClick={() => {
              e.onClick();
              setAnchorEl(null);
            }}
            style={{
              paddingTop: "12px",
            }}
          >
            {e.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
