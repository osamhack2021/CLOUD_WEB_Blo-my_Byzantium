import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FirearmAllType, FirearmListElement } from "../utils/types";

export default function FirearmAcceptUpdatePage() {
  const [waitList, setWaitList] = useState<FirearmListElement[]>([]);
  useEffect(() => {
    api.get<FirearmAllType[]>("firearm").then((res) => {
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
  }, []);
  const approve = () => {
    api.get("/firearm/approve");
  };
  const reject = () => {
    api.get("/firearm/reject");
  };
  return (
    <div>
      <h1>총기 최신화 승인 대기 목록</h1>
      {waitList.map((e, i) => (
        <div
          key={JSON.stringify(e)}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottom: "3px solid gray",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <div>
              {e.opType === "firearmCheckout" ? "총기 입고" : "총기 불출"}
            </div>
            <div>{e.date}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div>{`총기 번호: ${e.serialNumber}`}</div>
            <div>{`소유자: ${e.owner}`}</div>
            <div>{`총기 ${
              e.opType === "firearmCheckout" ? "입고" : "불출"
            } 사유: ${e.updateReason}`}</div>
          </div>
          <div style={{ flex: 1 }}>
            <Button
              disabled={i > 0}
              style={{ opacity: i === 0 ? "100" : "0" }}
              onClick={approve}
            >
              승인
            </Button>
            <Button
              disabled={i > 0}
              style={{ opacity: i === 0 ? "100" : "0" }}
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
