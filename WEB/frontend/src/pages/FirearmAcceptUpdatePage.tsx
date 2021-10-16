import { Button } from "@mui/material";
import React from "react";

type FirearmWaitListElementType = {
  date: string;
  firearmNumber: string;
  suggester: string;
  owner: string;
  reason: string;
  corps: string;
  in: boolean;
};

export default function FirearmAcceptUpdatePage() {
  const waitlist: FirearmWaitListElementType[] = [
    {
      date: "today",
      firearmNumber: "1234",
      suggester: "1",
      owner: "1",
      reason: "1",
      corps: "1",
      in: true,
    },
    {
      date: "today",
      firearmNumber: "1234",
      suggester: "2",
      owner: "2",
      reason: "2",
      corps: "2",
      in: false,
    },
    {
      date: "today",
      firearmNumber: "1234",
      suggester: "3",
      owner: "3",
      reason: "3",
      corps: "3",
      in: true,
    },
    {
      date: "today",
      firearmNumber: "1234",
      suggester: "4",
      owner: "4",
      reason: "4",
      corps: "4",
      in: false,
    },
  ];
  return (
    <div>
      <h1>총기 최신화 승인 대기 목록</h1>
      {waitlist.map((e, i) => (
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
            }}
          >
            <div>{e.date}</div>
            <div>{`건의자: ${e.suggester}`}</div>
          </div>
          <div>
            <div>{e.in ? "총기 입고" : "총기 불출"}</div>
            <div>{`총기 번호: ${e.firearmNumber}`}</div>
            <div>{`소유자: ${e.owner}`}</div>
            <div>{`총기 ${e.in ? "입고" : "불출"} 사유: ${e.reason}`}</div>
          </div>
          <div>
            <Button disabled={i > 0} style={{ opacity: i === 0 ? "100" : "0" }}>
              승인
            </Button>
            <Button disabled={i > 0} style={{ opacity: i === 0 ? "100" : "0" }}>
              반려
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
