import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import SearchBar from "./FirearmSearchBar";
import { SearchContext } from "../../pages/FireArmsPage";

export default function FirearmSearch() {
  const buttonNames = ["총기 번호", "총기 소유자"];
  const [selected, setSelected] = useState(0);
  const { setSearchText } = useContext(SearchContext);
  return (
    <div style={{ width: "60%", margin: "0 auto", paddingTop: "1em" }}>
      <div
        style={{ fontSize: "3em", fontWeight: "bold", paddingBottom: "0.5em" }}
      >
        총기 검색
      </div>
      <SearchBar
        placeholder={`${buttonNames[selected]}를 입력해주시오`}
        setSearchText={setSearchText}
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
