import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  children?: React.ReactChild | React.ReactChild[];
  placeholder: string;
  onClick: (searchText: string) => void;
  // setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ children, placeholder, onClick }: Props) {
  const [text, setText] = useState<string>("");
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
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            onClick(text);
            // setSearchText(text);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <div style={{ marginTop: "1em", display: "flex" }}>{children}</div>
    </>
  );
}
SearchBar.defaultProps = {
  children: undefined,
};
