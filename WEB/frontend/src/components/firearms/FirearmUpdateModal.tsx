import { TextField, Dialog, Button } from "@mui/material";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FirearmUpdateModal({ open, setIsModalOpen }: Props) {
  const reasons = [
    "사유를 선택해주시오",
    "총기 입고",
    "총기 불출",
    "경계 작전 복귀",
    "휴가 복귀",
    "파견 복귀",
  ];
  const [selectedReason, setSelectedReason] = useState("사유를 선택해주시오");
  const [militaryNumber, setMilitaryNumber] = useState("");
  const [corps, setCorps] = useState("");

  const onUpdate = () => {
    /* not Implemented Yet */
  };

  return (
    <Dialog
      onClose={(e) => setIsModalOpen(false)}
      open={open}
      disableEscapeKeyDown
      style={{ backgroundColor: "rgba( 255, 255, 255, 0.5 )" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          padding: "20px",
        }}
      >
        <div
          style={{ fontSize: "2em", fontWeight: "bold", marginBottom: "25px" }}
        >
          총기 수불 최신화
        </div>
        <Select
          value={selectedReason}
          onChange={(e: SelectChangeEvent) => {
            setSelectedReason(e.target.value);
            console.log(e.target.value);
          }}
          style={{ marginBottom: "10px" }}
        >
          {reasons.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
        <TextField
          placeholder="변경되는 총기 소유자의 군번을 입력하시오"
          variant="outlined"
          onChange={(e) => setMilitaryNumber(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          placeholder="변경되는 총기 소유자의 부대를 입력하시오"
          variant="outlined"
          onChange={(e) => setCorps(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button onClick={onUpdate}>수정하기</Button>
      </div>
    </Dialog>
  );
}
