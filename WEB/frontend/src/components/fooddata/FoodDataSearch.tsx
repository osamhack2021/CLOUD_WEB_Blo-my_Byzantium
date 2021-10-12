import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import SearchBar from "./FoodDataSearchBar";
import { SearchContext } from "../../pages/FoodDataPage";

export default function FoodDataSearch() {
  const [value, setValue] = useState<Date | null>(new Date());
  const handleChange = (date: Date | null) => {
    setValue(date);
  };
  const { searchText, setSearchText } = useContext(SearchContext);
  return (
    <div style={{ width: "60%", margin: "0 auto", paddingTop: "1em" }}>
      <div
        style={{ fontSize: "3em", fontWeight: "bold", paddingBottom: "0.5em" }}
      >
        부식 작전 검색
      </div>
      <SearchBar
        placeholder="부대를 입력해주시오"
        setSearchText={setSearchText}
        searchText={searchText}
        // onClick={() => console.log("not yet")}
      />
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DesktopDatePicker
          label="날짜"
          inputFormat="yyyy년 MM월 DD일"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              style={{ width: "100%", textAlign: "center" }}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}
