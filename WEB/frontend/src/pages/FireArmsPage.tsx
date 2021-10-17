import React, { useMemo, useState } from "react";
import moment from "moment";
import Divider from "@mui/material/Divider";
import FirearmList from "../components/firearms/FirearmList";
import { FirearmListElement, FirearmQueryType } from "../utils/types";
import FirearmSearch from "../components/firearms/FirearmSearch";
import FirearmStatus from "../components/firearms/FirearmStatus";
import FirearmUpdateModal from "../components/firearms/FirearmUpdateModal";
import api from "../utils/api";

export const SearchContext = React.createContext<{
  searchMode: number;
  setSearchMode: React.Dispatch<React.SetStateAction<number>>;
}>({ searchMode: 0, setSearchMode: () => 0 });

export default function FireArmsPage() {
  const [items, setItems] = useState<FirearmListElement[]>([]);
  const [searchMode, setSearchMode] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const value = useMemo(() => ({ searchMode, setSearchMode }), [searchMode]);
  const searchBySerialNumber = async (searchText: string) => {
    try {
      const res = await api.get<FirearmQueryType[]>(
        `/firearm/querySerialNumber/${searchText}`
      );
      setItems(
        res.data.map((e) => ({
          owner: e.Value.owner,
          affiliatedUnit: e.Value.affiliatedUnit,
          updateReason: e.Value.updateReason,
          date: moment(e.Timestamp).format("YY년 MM월 DD일"),
          time: moment(e.Timestamp).format("hh:mm:ss"),
          serialNumber: e.Value.serialNumber,
          model: e.Value.model,
        }))
      );
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("검색 결과가 없습니다. 다시 입력해주시오.");
      setItems([]);
    }
  };
  return (
    <SearchContext.Provider value={value}>
      <FirearmSearch
        searchBySerialNumber={searchBySerialNumber}
        errorMessage={errorMessage}
      />
      <Divider sx={{ mt: 3 }} />
      {items.length > 0 && (
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
