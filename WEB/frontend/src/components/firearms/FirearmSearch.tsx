import React, { useContext } from "react";
import { Button } from "@mui/material";
import SearchBar from "./FirearmSearchBar";
import { SearchContext } from "../../pages/FireArmsPage";

type Props = {
  searchBySerialNumber: (searchText: string) => void;
  errorMessage: string;
};

export default function FirearmSearch({
  searchBySerialNumber,
  errorMessage,
}: Props) {
  const buttonNames = ["총기 번호", "총기 소유자"];
  const { searchMode, setSearchMode } = useContext(SearchContext);
  return (
    <div style={{ width: "60%", margin: "0 auto", paddingTop: "1em" }}>
      <div
        style={{ fontSize: "3em", fontWeight: "bold", paddingBottom: "0.5em" }}
      >
        총기 검색
      </div>
      <SearchBar
        placeholder={`${buttonNames[searchMode]}를 입력해주시오`}
        // setSearchText={setSearchText}
        onClick={(searchText: string) => searchBySerialNumber(searchText)}
      >
        {buttonNames.map((e, i) => (
          <Button
            key={e}
            name={e}
            variant={searchMode === i ? "contained" : "outlined"}
            onClick={() => {
              setSearchMode(i);
            }}
            color="info"
            style={{ marginRight: "20px" }}
          >
            {e}
          </Button>
        ))}
      </SearchBar>
      <div style={{ color: "red" }}>{errorMessage}</div>
    </div>
  );
}
