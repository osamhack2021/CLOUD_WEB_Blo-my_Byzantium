import React from "react";
import firearmBackground from "../../images/firearmBackground.png";
import { FirearmListElement } from "../../utils/types";

type Props = {
  firearmElement: FirearmListElement;
};

export default function FirearmStatus({ firearmElement }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <img
        style={{ width: "100%", opacity: "0.3" }}
        src={firearmBackground}
        alt="firearm-background"
      />
      <div style={{ position: "absolute", top: "30%", left: "20%" }}>
        <h2>총기 현황</h2>
        <div>{`총기번호: ${firearmElement.fireArmNumber}`}</div>
        <div>{`총기소유주: ${firearmElement.owner}`}</div>
      </div>
    </div>
  );
}
