import React from "react";
import firearmBackground from "../../images/firearmBackground.png";
import { FirearmListElement } from "../../utils/types";

type Props = {
  firearmElement: FirearmListElement;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FirearmStatus({
  firearmElement,
  setIsModalOpen,
}: Props) {
  const onClick = () => {
    setIsModalOpen(true);
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
        src={firearmBackground}
        alt="firearm-background"
      />
      <div className="firearm-status-content">
        <div className="firearm-status-text">
          <div className="firearm-status-title">총기 현황</div>
          <div className="firearm-status-body">
            {`총기번호: ${firearmElement.serialNumber}`}
          </div>
          <div className="firearm-status-body">{`총기명: ${firearmElement.model}`}</div>
          <div className="firearm-status-body">{`총기소유주: ${firearmElement.owner}`}</div>
          <div className="firearm-status-body">
            {`부대: ${firearmElement.affiliatedUnit}`}
          </div>
          <div className="firearm-status-body">
            {`최종 변경 사유: ${firearmElement.updateReason}`}
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
