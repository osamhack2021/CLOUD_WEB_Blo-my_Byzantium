import React from "react";
import { FoodDataHistoryType } from "../../utils/types";
import Timeline from "../Timeline";

type Props = {
  items: FoodDataHistoryType;
};

export default function FirearmList({ items }: Props) {
  console.log(items);
  const foodDataInfos = [
    {
      status: "",
      date: "",
      time: "",
      out: items.opType === "CHECKOUT",
      opType: items.opType,
      extraData: [],
    },
  ];
  return <Timeline items={foodDataInfos} />;
}
