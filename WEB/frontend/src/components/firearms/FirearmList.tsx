import React from "react";
import { FirearmListElement } from "../../utils/types";
import Timeline from "../Timeline";

interface Props {
  items: FirearmListElement[];
}

export default function FirearmList(props: Props) {
  const { items } = props;
  const firearmInfos = items.map((item) => ({
    status: `${item.misc}`,
    date: item.date,
    time: item.time,
    out: item.opType === "CHECKOUT",
    extraData: [
      `총기 번호: ${item.serialNumber}`,
      `총기 소유자: ${item.owner}`,
      `총기 입고 사유: ${item.updateReason}`,
    ],
  }));
  return <Timeline items={firearmInfos} />;
}
