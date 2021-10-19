import React, { useEffect, useMemo, useState } from "react";
import Divider from "@mui/material/Divider";
import FirearmList from "../components/firearms/FirearmList";
import { FirearmListElement } from "../utils/types";
import FoodDataSearch from "../components/fooddata/FoodDataSearch";
import FoodDataStatus from "../components/fooddata/FoodDataStatus";
import FoodDataUpdateModal from "../components/fooddata/FoodDataUpdateModal";
import api from "../utils/api";

export default function FireArmsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/foods/queryAllUnits").then((res) => console.log(res));
  }, []);

  return (
    <>
      <FoodDataSearch setItems={setItems} />
      <Divider sx={{ mt: 3 }} />
      {items.length > 0 && (
        <>
          <FoodDataUpdateModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </>
  );
}
