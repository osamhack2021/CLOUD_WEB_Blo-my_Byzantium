import { Button } from "@mui/material";
import React from "react";

type FoodDataWaitListElementType = {
  date: string;
  foodName: string;
  suggester: string;
  corps: string;
  inCome: string;
  outCome: string;
  in: boolean;
};

export default function FoodDataAcceptUpdatePage() {
  const waitlist: FoodDataWaitListElementType[] = [
    {
      date: "today",
      foodName: "1234",
      suggester: "1",
      corps: "1",
      inCome: "1/1",
      outCome: "1/1",
      in: true,
    },
    {
      date: "today",
      foodName: "1234",
      suggester: "1",
      corps: "1",
      inCome: "1/1",
      outCome: "1/1",
      in: true,
    },
    {
      date: "today",
      foodName: "1234",
      suggester: "1",
      corps: "1",
      inCome: "1/1",
      outCome: "1/1",
      in: true,
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
            <div>{`${e.foodName}`}</div>
            <div>{`부대명: ${e.corps}`}</div>
            <div>{`수령량: ${e.inCome}`}</div>
            <div>{`불출량: ${e.outCome}`}</div>
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
