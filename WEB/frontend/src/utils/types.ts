export interface FirearmListElement {
  serialNumber: string;
  owner: string;
  affiliatedUnit: string;
  updateReason: string;
  date: string;
  time: string;
  model: string;
  misc: string;
}

export type foodDataSearchType = {
  corps: string;
  food: string;
};

export type FirearmQueryType = {
  Timestamp: string;
  TxId: string;
  Value: {
    affiliatedUnit: string;
    docType: string;
    misc: string;
    model: string;
    opType: string;
    owner: string;
    serialNumber: string;
    updateReason: string;
  };
};
