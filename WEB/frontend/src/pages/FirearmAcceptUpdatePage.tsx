import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FirearmAllType, FirearmListElement } from "../utils/types";
import firearmBackground from "../images/firearmBackground.png";

export default function FirearmAcceptUpdatePage() {
  const [waitList, setWaitList] = useState<FirearmListElement[]>([]);
  const getList = () => {
    api.get<FirearmAllType[]>("/firearm/").then((res) => {
      setWaitList(
        res.data.map((e) => ({
          opType: e.opType,
          serialNumber: e.SerialNumber,
          owner: e.Owner,
          affiliatedUnit: e.Affiliated_Unit,
          updateReason: e.UpdateReason,
          date: "",
          time: "",
          model: "",
          misc: "",
        }))
      );
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const approve = () => {
    api.get("/firearm/approve").then(() => getList());
  };
  const reject = () => {
    api.get("/firearm/reject").then(() => getList());
  };
  return (
    <div>
      <div
        className="firearm-status-container"
        style={{ paddingBottom: "10px" }}
      >
        <img
          style={{
            height: "200px",
            width: "100%",
            opacity: "0.3",
            objectFit: "cover",
          }}
          src={firearmBackground}
          alt="firearm-background"
        />

        <div
          style={{
            left: "10%",
            top: 0,
            position: "absolute",
            lineHeight: "150px",
          }}
        >
          <h1>총기 최신화 승인 대기 목록</h1>
        </div>
      </div>
      {waitList.map((e, i) => (
        <div
          key={JSON.stringify(e)}
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "3px solid gray",
            marginTop: "30px",
            marginLeft: "20%",
            marginRight: "20%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              {e.opType === "firearmCheckout" ? "총기 입고" : "총기 불출"}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>{`총기 번호: ${e.serialNumber}`}</div>
            <div>{`소유자: ${e.owner}`}</div>
            <div>{`총기 ${
              e.opType === "firearmCheckout" ? "입고" : "불출"
            } 사유: ${e.updateReason}`}</div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              disabled={i > 0}
              variant="contained"
              style={{
                visibility: i > 0 ? "hidden" : "visible",
                marginRight: "30px",
              }}
              onClick={approve}
            >
              승인
            </Button>
            <Button
              disabled={i > 0}
              variant="contained"
              style={{ visibility: i > 0 ? "hidden" : "visible" }}
              onClick={reject}
            >
              반려
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
