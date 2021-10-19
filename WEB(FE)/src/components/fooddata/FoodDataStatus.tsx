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
  const [foods, setFoods] = useState<{ name: string; amount: string }[]>([]);
  const [selectedFood, setSelectedFood] = useState("음식을 선택하시오");
  const onClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    api.get(`/foods/queryUnit/${affiliatedUnit}`).then((res) => {
      console.log(`unit`);
      console.log(res);
      setFoods(res.data.foods);
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
          <div className="firearm-status-body">{affiliatedUnit}</div>
          {foods
            .filter((e) => e.name === selectedFood)
            .map((e) => (
              <div key={e.name}>
                <div className="firearm-status-body">{`${e.name}`}</div>
                <div className="firearm-status-body">{`할당량: ${e.amount}`}</div>
                <div className="firearm-status-body">{`수령량: ${e.amount}`}</div>
                <div className="firearm-status-body">{`불출량: ${e.amount}`}</div>
                <div className="firearm-status-body">{`보유량: ${e.amount}`}</div>
              </div>
            ))}
        </div>
        <div
          className="update-button-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {selectedFood !== "음식을 선택하시오" && (
            <button type="submit" className="update-button" onClick={onClick}>
              업데이트
            </button>
          )}
          <div className="select-food-container">
            {foods.length > 0 && (
              <Select
                value={selectedFood}
                onChange={(e: SelectChangeEvent) => {
                  setSelectedFood(e.target.value as string);
                }}
                style={{ width: "200px" }}
              >
                <MenuItem value="음식을 선택하시오">음식을 선택하시오</MenuItem>
                {foods.map((e) => (
                  <MenuItem key={e.name} value={e.name}>
                    {e.name}
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
