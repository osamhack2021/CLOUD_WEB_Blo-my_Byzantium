import React, { useMemo, useState } from "react";
import Divider from "@mui/material/Divider";
import FirearmList from "../components/firearms/FirearmList";
import { FirearmListElement } from "../utils/types";
import FirearmSearch from "../components/firearms/FirearmSearch";
import FirearmStatus from "../components/firearms/FirearmStatus";
import FirearmUpdateModal from "../components/firearms/FirearmUpdateModal";

export const SearchContext = React.createContext<{
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}>({ searchText: "", setSearchText: () => "" });

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
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const value = useMemo(() => ({ searchText, setSearchText }), [searchText]);

  return (
    <SearchContext.Provider value={value}>
      <FirearmSearch />
      <Divider sx={{ mt: 3 }} />
      {searchText.length > 0 && (
        <>
          <FirearmStatus
            firearmElement={items[0]}
            setIsModalOpen={setIsModalOpen}
          />
          <FirearmList items={items} />
          <FirearmUpdateModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </SearchContext.Provider>
  );
}
