import React, { useMemo, useState } from "react";
import Divider from "@mui/material/Divider";
import FirearmList from "../components/firearms/FirearmList";
import { FirearmListElement, foodDataSearchType } from "../utils/types";
import FoodDataSearch from "../components/fooddata/FoodDataSearch";
import FoodDataStatus from "../components/fooddata/FoodDataStatus";

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
  // Dummy Data
  const items: FirearmListElement[] = new Array(10);
  items[0] = {
    time: "oct 2nd",
    owner: "moon",
    status: "불출",
    fireArmNumber: "aaa",
    reason: "gone",
  };
  const [item] = items;
  for (let i = 1; i < 10; i += 1) items[i] = item;
  // End of Dummy Data
  const [searchText, setSearchText] = useState<foodDataSearchType>({
    corps: "",
    food: "",
  });
  const value = useMemo(() => ({ searchText, setSearchText }), [searchText]);

  return (
    <SearchContext.Provider value={value}>
      <FoodDataSearch />
      <Divider sx={{ mt: 3 }} />
      {searchText.corps.length > 0 && searchText.food.length > 0 && (
        <>
          <FoodDataStatus firearmElement={items[0]} />
          <FirearmList items={items} />
        </>
      )}
    </SearchContext.Provider>
  );
}
