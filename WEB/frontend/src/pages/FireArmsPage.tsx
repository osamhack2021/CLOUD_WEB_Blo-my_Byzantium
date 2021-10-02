import React from "react";
import FirearmList from "../components/firearms/FirearmList";
import { FirearmListElement } from "../utils/types";

export default function FireArmsPage() {
  const items: FirearmListElement[] = [
    {
      time: "oct 2nd",
      owner: "moon",
      status: 1,
      fireArmNumber: "aaa",
      reason: "gone",
    },
    {
      time: "oct 2nd",
      owner: "moon",
      status: 1,
      fireArmNumber: "aaa",
      reason: "gone",
    },
    {
      time: "oct 2nd",
      owner: "moon",
      status: 1,
      fireArmNumber: "aaa",
      reason: "gone",
    },
    {
      time: "oct 2nd",
      owner: "moon",
      status: 1,
      fireArmNumber: "aaa",
      reason: "gone",
    },
    {
      time: "oct 2nd",
      owner: "moon",
      status: 1,
      fireArmNumber: "aaa",
      reason: "gone",
    },
    {
      time: "oct 2nd",
      owner: "moon",
      status: 1,
      fireArmNumber: "aaa",
      reason: "gone",
    },
  ];
  return (
    <>
      <FirearmList items={items} />
    </>
  );
}
