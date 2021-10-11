import React from "react";
import axios from "axios";
import FoodDataBackground from "../../images/fooddataBackground.png";
import { FirearmListElement } from "../../utils/types";

type Props = {
  firearmElement: FirearmListElement;
};

export default function FoodDataStatus({ firearmElement }: Props) {
  const baseUrl =
    "https://osamhack2021-cloud-web-blo-my-byzantium-v5jxjj4w2qx5-8080.githubpreview.dev/";
  const onClick = () => {
    axios({
      method: "get",
      url: `${baseUrl}/firearmAssets`,
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="firearm-status-container">
      <img
        style={{
          height: "600px",
          width: "100%",
          opacity: "0.3",
          objectFit: "cover",
        }}
        src={FoodDataBackground}
        alt="fooddata-background"
      />
      <div className="firearm-status-content">
        <div className="firearm-status-text">
          <div className="firearm-status-title">부식작전 현황</div>
          <div className="firearm-status-body">1여단 1대대 1중대 중대본부</div>
          <div className="firearm-status-body">할당량: 50</div>
          <div className="firearm-status-body">수령량: 130</div>
          <div className="firearm-status-body">불출량: 50</div>
          <div className="firearm-status-body">보유량: 50</div>
          <div className="firearm-status-body" style={{ color: "red" }}>
            이상여부: O
          </div>
        </div>
        <div className="update-button-container">
          <button type="submit" className="update-button" onClick={onClick}>
            업데이트
          </button>
        </div>
      </div>
    </div>
  );
}
