import { TextField, Dialog, Button } from "@mui/material";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FirearmListElement } from "../../utils/types";
import api from "../../utils/api";

type Props = {
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  firearmElement: FirearmListElement;
};

export default function FirearmUpdateModal({
  open,
  setIsModalOpen,
  firearmElement,
}: Props) {
  const reasons = [
    "사유를 선택해주시오",
    "총기 입고",
    "총기 불출",
    "경계 작전 복귀",
    "휴가 복귀",
    "파견 복귀",
    "기타",
  ];
  const [selectedReason, setSelectedReason] = useState(reasons[0]);
  const [extraReason, setExtraReason] = useState("");
  const [owner, setOwner] = useState("");
  const [affiliatedUnit, setAffiliatedUnit] = useState("");

  const onUpdate = () => {
    api.post("/firearm/changeFirearmAttributes", {
      opType: "changeFirearmAttributes",
      SerialNumber: firearmElement.serialNumber,
      Weapon_Model: firearmElement.model,
      Owner: owner || firearmElement.owner,
      Affiliated_Unit: affiliatedUnit || firearmElement.affiliatedUnit,
      status: firearmElement.misc,
      UpdateReason: selectedReason === "기타" ? extraReason : selectedReason,
    });
  };

  return (
    <Dialog
      onClose={() => {
        setIsModalOpen(false);
        setSelectedReason(reasons[0]);
        setOwner("");
        setAffiliatedUnit("");
      }}
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
            setExtraReason("");
          }}
          style={{ marginBottom: "10px" }}
        >
          {reasons.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
        {selectedReason === "기타" && (
          <TextField
            label="사유"
            placeholder="사유를 입력해주시오"
            variant="outlined"
            value={extraReason}
            onChange={(e) => setExtraReason(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        )}
        <TextField
          label="총기 소유주"
          placeholder={owner || firearmElement.owner}
          variant="outlined"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="부대"
          placeholder={affiliatedUnit || firearmElement.affiliatedUnit}
          variant="outlined"
          value={affiliatedUnit}
          onChange={(e) => setAffiliatedUnit(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button onClick={onUpdate}>수정하기</Button>
      </div>
    </Dialog>
  );
}
