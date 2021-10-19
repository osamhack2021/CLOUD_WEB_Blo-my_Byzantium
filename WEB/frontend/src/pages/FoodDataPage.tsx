import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import FoodDataSearch from "../components/fooddata/FoodDataSearch";
import FoodDataStatus from "../components/fooddata/FoodDataStatus";
import FoodDataUpdateModal from "../components/fooddata/FoodDataUpdateModal";
import api from "../utils/api";
import { FoodDataHistoryType } from "../utils/types";
import FoodDataList from "../components/fooddata/FoodDataList";

export default function FoodDataPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<FoodDataHistoryType>({
    foods: [],
    opType: "",
  });
  const [affiliatedUnit, setAffiliatedUnit] = useState("");

  useEffect(() => {
    api.get("/foods/queryAllUnits").then((res) => console.log(res));
  }, []);

  return (
    <>
      <FoodDataSearch
        setItems={setItems}
        setAffiliatedUnit={setAffiliatedUnit}
      />
      <Divider sx={{ mt: 3 }} />
      {affiliatedUnit.length > 0 && (
        <>
          <FoodDataStatus
            setIsModalOpen={setIsModalOpen}
            affiliatedUnit={affiliatedUnit}
          />
          <FoodDataUpdateModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <FoodDataList items={items} />
        </>
      )}
    </>
  );
}
