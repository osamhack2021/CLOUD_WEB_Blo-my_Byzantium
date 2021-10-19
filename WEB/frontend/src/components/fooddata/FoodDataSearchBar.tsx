import React, { Dispatch, SetStateAction, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../utils/api";
import { FoodDataHistoryType, FoodDataSearchType } from "../../utils/types";

type Props = {
  children?: React.ReactChild | React.ReactChild[];
  placeholder: string;
  setItems: Dispatch<SetStateAction<FoodDataHistoryType>>;
  setAffiliatedUnit: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({
  children,
  placeholder,
  setItems,
  setAffiliatedUnit,
}: Props) {
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
              .get<FoodDataSearchType>(`/foods/GetUnitHistory/${texts}`)
              .then((res) => {
                console.log(res);
                setAffiliatedUnit(res.data.affiliatedUnit);
                setItems({ foods: res.data.foods, opType: res.data.opType });
              });
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
