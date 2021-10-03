import React, { useState } from "react";
import { Button } from "@mui/material";
import SearchBar from "../SearchBar";

export default function FirearmSearch() {
  const buttonNames = ["총기 번호", "총기 소유자"];
  const [selected, setSelected] = useState(0);
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <SearchBar
        placeholder={`${buttonNames[selected]}를 입력해주시오`}
        // onClick={() => console.log("not yet")}
      >
        {buttonNames.map((e, i) => (
          <Button
            key={e}
            name={e}
            variant={selected === i ? "contained" : "outlined"}
            onClick={() => {
              setSelected(i);
            }}
            color="secondary"
          >
            {e}
          </Button>
        ))}
      </SearchBar>
    </div>
  );
}
