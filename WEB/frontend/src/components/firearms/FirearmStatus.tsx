import React from "react";
import { Button } from "@mui/material";
import firearmBackground from "../../images/firearmBackground.png";
import { FirearmListElement } from "../../utils/types";

type Props = {
  firearmElement: FirearmListElement;
};

export default function FirearmStatus({ firearmElement }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <img
        style={{ height: "600px", opacity: "0.3", objectFit: "cover" }}
        src={firearmBackground}
        alt="firearm-background"
      />
      <div
        style={{
          top: "0px",
          left: "0px",
          position: "absolute",
          height: "600px",
          width: "100vw",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "64px",
              marginBottom: "30px",
              color: "#3d4147",
            }}
          >
            총기 현황
          </div>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#3d4147" }}
          >{`총기번호: ${firearmElement.fireArmNumber}`}</div>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#3d4147" }}
          >
            총기명: K2
          </div>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#3d4147" }}
          >{`총기소유주: ${firearmElement.owner}`}</div>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#3d4147" }}
          >
            부대: 5사단 12여단 3대대 5중대 중대본부
          </div>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#3d4147" }}
          >
            최종 변경 사유: 총기 정비 후 재지급
          </div>
        </div>
        <div style={{ margin: "auto 0" }}>
          <button
            type="submit"
            className="update-button"
            onClick={() => {
              console.log("Clicked");
            }}
          >
            업데이트
          </button>
        </div>
      </div>
    </div>
  );
}
