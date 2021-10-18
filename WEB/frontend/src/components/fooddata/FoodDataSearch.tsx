import React, { Dispatch, SetStateAction, useState } from "react";
import SearchBar from "./FoodDataSearchBar";

type Props = {
  setItems: Dispatch<SetStateAction<never[]>>;
};

export default function FoodDataSearch({ setItems }: Props) {
  return (
    <div style={{ width: "60%", margin: "0 auto", paddingTop: "1em" }}>
      <div
        style={{ fontSize: "3em", fontWeight: "bold", paddingBottom: "0.5em" }}
      >
        부식 작전 검색
      </div>
      <SearchBar placeholder="부대를 입력해주시오" setItems={setItems} />
    </div>
  );
}
