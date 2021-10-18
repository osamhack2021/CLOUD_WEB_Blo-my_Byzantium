export interface FirearmListElement {
  serialNumber: string;
  owner: string;
  affiliatedUnit: string;
  updateReason: string;
  date: string;
  time: string;
  model: string;
  misc: string;
  opType: string;
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

export type FirearmAllType = {
  // eslint-disable-next-line camelcase
  Affiliated_Unit: string;
  Owner: string;
  SerialNumber: string;
  UpdateReason: string;
  // eslint-disable-next-line camelcase
  Weapon_Model: string;
  opType: string;
  status: string;
};
