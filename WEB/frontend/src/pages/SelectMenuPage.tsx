import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function SelectMenuPage() {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button>부식</Button>
      <Button
        onClick={() => {
          history.push("/firearms");
        }}
      >
        총기
      </Button>
    </div>
  );
}
