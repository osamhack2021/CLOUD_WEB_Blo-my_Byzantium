import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Firearm from "../images/firearm.png";
import FoodData from "../images/fooddata.png";

export default function SelectMenuPage() {
  const history = useHistory();
  return (
    <div
      style={{
        paddingTop: "10%",
        paddingLeft: "10%",
        paddingRight: "10%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Button
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          history.push("/fooddata");
        }}
      >
        <img src={FoodData} alt="FoodData" />
        <div style={{ color: "#B695E5", fontSize: "3em" }}>부식 작전</div>
      </Button>
      <Button
        onClick={() => {
          history.push("/firearms");
        }}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={Firearm} alt="Firearm" />
        <div style={{ color: "#B695E5", fontSize: "3em" }}>총기 수불</div>
      </Button>
    </div>
  );
}
