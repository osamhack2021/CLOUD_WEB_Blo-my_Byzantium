import React from "react";
import { Chrono } from "react-chrono";
import { FirearmListElement } from "../../utils/types";

interface Props {
  items: FirearmListElement[];
}

export default function FirearmList(props: Props) {
  const { items } = props;
  return (
    <div style={{ width: "70%", marginLeft: "20%" }}>
      <Chrono
        useReadMore={false}
        theme={{
          primary: "gray",
          secondary: "gray",
          titleColor: "black",
        }}
        items={items.map((e) => ({
          title: e.time,
          cardTitle: `${e.status}`,
          cardSubtitle: `총기번호: ${e.fireArmNumber} / 소유자: ${e.owner}`,
          cardDetailedText: `${e.reason}`,
        }))}
        mode="VERTICAL"
        hideControls
      />
    </div>
  );
}
