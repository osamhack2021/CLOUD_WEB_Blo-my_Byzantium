import { TextField, Dialog, Button } from "@mui/material";
import React, { useState } from "react";

type Props = {
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FirearmUpdateModal({ open, setIsModalOpen }: Props) {
  const [changeValue, setChangeValue] = useState({ in: "", out: "" });

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
          부식작전 최신화
        </div>
        <TextField
          placeholder="수령량을 입력하시오"
          variant="outlined"
          onChange={(e) =>
            setChangeValue({ ...changeValue, in: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <TextField
          placeholder="불출량을 입력하시오"
          variant="outlined"
          onChange={(e) =>
            setChangeValue({ ...changeValue, out: e.target.value })
          }
          style={{ marginBottom: "20px" }}
        />
        <Button onClick={onUpdate}>수정하기</Button>
      </div>
    </Dialog>
  );
}
