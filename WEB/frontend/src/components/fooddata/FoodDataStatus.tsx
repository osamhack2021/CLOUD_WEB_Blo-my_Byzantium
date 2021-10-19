import React, { useEffect, useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FoodDataBackground from "../../images/fooddataBackground.png";
import api from "../../utils/api";

type Props = {
  affiliatedUnit: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FoodDataStatus({
  affiliatedUnit,
  setIsModalOpen,
}: Props) {
  const [foods, setFoods] = useState<string[]>([]);
  const [selectedFood, setSelectedFood] = useState("");
  const onClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    api.get(`/foods/queryUnit/${affiliatedUnit}`).then((res) => {
      setFoods(
        res.data.foods.map((e: { name: string; amount: string }) => e.name)
      );
      setSelectedFood(res.data.foods[0].name);
    });
  }, []);
  return (
    <div className="firearm-status-container">
      <img
        style={{
          height: "600px",
          width: "100%",
          opacity: "0.3",
          objectFit: "cover",
        }}
        src={FoodDataBackground}
        alt="fooddata-background"
      />
      <div className="firearm-status-content">
        <div className="firearm-status-text">
          <div className="firearm-status-title">부식작전 현황</div>
          <div className="firearm-status-body">1여단 1대대 1중대 중대본부</div>
          <div className="firearm-status-body">할당량: 50</div>
          <div className="firearm-status-body">수령량: 130</div>
          <div className="firearm-status-body">불출량: 50</div>
          <div className="firearm-status-body">보유량: 50</div>
          <div className="firearm-status-body" style={{ color: "red" }}>
            이상여부: O
          </div>
        </div>
        <div
          className="update-button-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <button type="submit" className="update-button" onClick={onClick}>
            업데이트
          </button>
          <div className="select-food-container">
            {foods.length > 0 && (
              <Select
                value={selectedFood}
                label="Food"
                onChange={(e: SelectChangeEvent) => {
                  setSelectedFood(e.target.value as string);
                }}
              >
                {foods.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
