import React, { Dispatch, SetStateAction, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../utils/api";

type Props = {
  children?: React.ReactChild | React.ReactChild[];
  placeholder: string;
  setItems: Dispatch<SetStateAction<never[]>>;
};

export default function SearchBar({ children, placeholder, setItems }: Props) {
  const [texts, setTexts] = useState("");
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
          value={texts}
          onChange={(e) => setTexts(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            api
              .get(`/foods/GetUnitHistory/${texts}`)
              .then((res) => console.log(res));
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
