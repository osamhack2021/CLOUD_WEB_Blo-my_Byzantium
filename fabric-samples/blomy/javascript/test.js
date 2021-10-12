
// const unit = {
//   "affiliatedUnit": "1div11regt1bn1co1p",
//   "foods": [
//       {
//           "name" : "kimchi",
//           "amount" : "50",
//       },
//       {
//           "name" : "tuna",
//           "amount" : "90"
//       }
//   ],
//   "opType": "CREATE"
// };

// var foodname = "kimchi";
// var amount = "1000";
// amount = Number(amount);
// const checkFood = food => food.name === foodname;

// if(unit.foods.some(checkFood)){
//     let currentAmount = Number(unit.foods.find(food => food.name ===foodname).amount);
//     unit.foods.find(food => food.name ===foodname).amount = currentAmount + amount;
//     console.log(1);
// }else{
//     unit.foods.push({
//         "name": foodname,
//         "amount": amount
//     });
// }

// console.log(unit);


var firearmHistory = [
    {
      "TxId": "980273f61755e89e89b8928e3982663dca86370c0026ee342cc6f86f0b43e09f",
      "Timestamp": "Wed Oct 06 2021 11:14:24 GMT+0000 (Coordinated Universal Time)",
      "Value": {
        "affiliatedUnit": "5div12regt3bn5coHQ",
        "docType": "firearm",
        "misc": "이상 무",
        "model": "K-1A",
        "opType": "CHECKOUT",
        "owner": "오동재",
        "serialNumber": "1234567",
        "updateReason": "총기 정비 후 재지급"
      }
    },
    {
      "TxId": "9b8bfdf729c3b2b36ae686c36e74ff69c0c7eb3b2a9aed16fd8457a6520d8345",
      "Timestamp": "Wed Oct 06 2021 11:14:22 GMT+0000 (Coordinated Universal Time)",
      "Value": {
        "affiliatedUnit": "5div12regt3bn5coHQ",
        "docType": "firearm",
        "misc": "장전 손잡이 고장",
        "model": "K-1A",
        "opType": "CHECKIN",
        "owner": "오동재",
        "serialNumber": "1234567",
        "updateReason": "기능고장으로 인한 정비"
      }
    },
    {
      "TxId": "778479d855a7f827bc74f4d268f0aad738c401de204c6e2c0e171811ae54d771",
      "Timestamp": "Wed Oct 06 2021 11:14:20 GMT+0000 (Coordinated Universal Time)",
      "Value": {
        "affiliatedUnit": "5div12regt3bn5coHQ",
        "docType": "firearm",
        "misc": "이상 무",
        "model": "K-1A",
        "opType": "CHECKOUT",
        "owner": "오동재",
        "serialNumber": "1234567",
        "updateReason": "보직 변경으로 인한 총기 조정 지급"
      }
    },
    {
      "TxId": "136904abcc201b0eaa1f6ef7ca3268ff7be0f19fd9c429c77bc156ef4bac0ef0",
      "Timestamp": "Wed Oct 06 2021 11:14:17 GMT+0000 (Coordinated Universal Time)",
      "Value": {
        "affiliatedUnit": "5div12regt3bn5coHQ",
        "docType": "firearm",
        "misc": "지급 대기",
        "model": "K-1A",
        "opType": "CHANGE",
        "owner": "오동재",
        "serialNumber": "1234567",
        "updateReason": "보직 변경"
      }
    },
    {
      "TxId": "f1228a502e61c9b1246074664d8d97c421a236a35ba94555d26008f464e9270c",
      "Timestamp": "Wed Oct 06 2021 11:14:15 GMT+0000 (Coordinated Universal Time)",
      "Value": {
        "affiliatedUnit": "1div11regt1bn1co2p",
        "docType": "firearm",
        "misc": "이상 무",
        "model": "K-1A",
        "opType": "CHECKIN",
        "owner": "박한성",
        "serialNumber": "1234567",
        "updateReason": "보직 변경으로 인한 총기 반납"
      }
    },
    {
      "TxId": "f89e258aebe24090f66a05c0b2cc9be8c19db072972df89aff09253e384a8361",
      "Timestamp": "Wed Oct 06 2021 11:14:13 GMT+0000 (Coordinated Universal Time)",
      "Value": {
        "affiliatedUnit": "1div11regt1bn1co2p",
        "docType": "firearm",
        "misc": "이상 무",
        "model": "K-1A",
        "opType": "CHECKOUT",
        "owner": "박한성",
        "serialNumber": "1234567",
        "updateReason": "전입 신병 총기 수여식"
      }
    },
    {
      "TxId": "d6762c0b116ebbbab77b346f14c388e91b0d8f1c41453c53698b095ea96c0024",
      "Timestamp": "Wed Oct 06 2021 11:01:43 GMT+0000 (Coordinated Universal Time)",
      "Value": {
        "serialNumber": "1234567",
        "docType": "firearm",
        "model": "K-1A",
        "owner": "박한성",
        "affiliatedUnit": "1div11regt1bn1co2p",
        "misc": "지급 대기",
        "updateReason": "전입 신병 중대 총기수령",
        "opType": "CREATE"
      }
    }
  ];



var checkoutOnly = firearmHistory.filter(function (entry) {
    return entry.Value.opType === 'CHECKOUT';
});

console.log(JSON.stringify(checkoutOnly));

