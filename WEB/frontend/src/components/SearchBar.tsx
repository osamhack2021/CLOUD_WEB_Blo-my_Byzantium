import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { SearchContext } from "../pages/FireArmsPage";

type Props = {
  children?: React.ReactChild | React.ReactChild[];
  placeholder: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar(props: Props) {
  const [text, setText] = useState<string>("");
  const { children, placeholder, setSearchText } = props;
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
            setSearchText(text);
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
