/* eslint-disable no-nested-ternary */
/* eslint-disable dot-notation */
import React from "react";

type timelineItemType = {
  status: string;
  date: string;
  time: string;
  out: boolean;
  opType: string;
  extraData: string[];
};

interface TimelineItemProps {
  item: timelineItemType;
}
interface TimelineProps {
  items: timelineItemType[];
}

function FoodDataTimelineItem({ item }: TimelineItemProps) {
  return (
    <div
      className={
        !item.out ? "timeline-item" : "timeline-item timeline-item-out"
      }
    >
      <div className="timeline-item-content">
        <span className="tag">
          {item.opType === "CHECKIN"
            ? "입고"
            : item.opType === "CHECKOUT"
            ? "불출"
            : "지급대기"}
        </span>
        <time>{item.date}</time>
        <time className="time">{item.time}</time>
        <div
          style={{
            paddingTop: "10px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          {item.extraData.length > 0 &&
            item.extraData.map((e) => (
              <div className="timeline-item-extra-data" key={e}>
                {e}
              </div>
            ))}
        </div>
        <span className="circle" />
      </div>
    </div>
  );
}

export default function FoodDataTimeline({ items }: TimelineProps) {
  return (
    <div>
      {items.length > 0 && (
        <div className="timeline-container">
          {items.map((item: timelineItemType) => (
            <FoodDataTimelineItem item={item} key={item.time} />
          ))}
        </div>
      )}
    </div>
  );
}
