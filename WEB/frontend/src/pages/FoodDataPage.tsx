import React, { useMemo, useState } from "react";
import Divider from "@mui/material/Divider";
import FirearmList from "../components/firearms/FirearmList";
import { FirearmListElement, foodDataSearchType } from "../utils/types";
import FoodDataSearch from "../components/fooddata/FoodDataSearch";
import FoodDataStatus from "../components/fooddata/FoodDataStatus";
import FoodDataUpdateModal from "../components/fooddata/FoodDataUpdateModal";

export const SearchContext = React.createContext<{
  searchText: foodDataSearchType;
  setSearchText: React.Dispatch<React.SetStateAction<foodDataSearchType>>;
}>({
  searchText: {
    corps: "",
    food: "",
  },
  setSearchText: () => "",
});

export default function FireArmsPage() {
  const [searchText, setSearchText] = useState<foodDataSearchType>({
    corps: "",
    food: "",
  });
  const value = useMemo(() => ({ searchText, setSearchText }), [searchText]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SearchContext.Provider value={value}>
      <FoodDataSearch />
      <Divider sx={{ mt: 3 }} />
      {searchText.corps.length > 0 && searchText.food.length > 0 && (
        <>
          <FoodDataUpdateModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </SearchContext.Provider>
  );
}
