import React from "react";
import { FirearmListElement } from "../../utils/types";
import Timeline from "../Timeline";

interface Props {
  items: FirearmListElement[];
}

export default function FirearmList(props: Props) {
  const { items } = props;
  const firearmInfos = items.map((item) => ({
    status: `${item.status}`,
    time: item.time,
    out: true,
    extraData: [
      `총기 번호: ${item.fireArmNumber}`,
      `총기 소유자: ${item.owner}`,
      `총기 입고 사유: ${item.reason}`,
    ],
  }));
  return <Timeline items={firearmInfos} />;
}
