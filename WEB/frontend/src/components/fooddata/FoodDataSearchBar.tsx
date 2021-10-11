import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Divider } from "@mui/material";
import { foodDataSearchType } from "../../utils/types";

type Props = {
  children?: React.ReactChild | React.ReactChild[];
  placeholder: string;
  searchText: foodDataSearchType;
  setSearchText: React.Dispatch<React.SetStateAction<foodDataSearchType>>;
};

export default function SearchBar({
  children,
  placeholder,
  searchText,
  setSearchText,
}: Props) {
  const [texts, setTexts] = useState<foodDataSearchType>({
    corps: "",
    food: "",
  });
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
        elevation={3}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={texts.corps}
          onChange={(e) => setTexts({ ...texts, corps: e.target.value })}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="부식을 입력해주시오"
          value={texts.food}
          onChange={(e) => setTexts({ ...texts, food: e.target.value })}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            setSearchText(texts);
            console.log(searchText);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <div style={{ marginTop: "1em", display: "flex", gap: "1em" }}>
        {children}
      </div>
    </>
  );
}
SearchBar.defaultProps = {
  children: undefined,
};
