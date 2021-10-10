const unit = {
  "affiliatedUnit": "1div11regt1bn1co1p",
  "foods": [
      {
          "name" : "kimchi",
          "amount" : "50",
      },
      {
          "name" : "tuna",
          "amount" : "90"
      }
  ],
  "opType": "CREATE"
};

var foodname = "kimchi";
var amount = "1000";
amount = Number(amount);
const checkFood = food => food.name === foodname;

if(unit.foods.some(checkFood)){
    let currentAmount = Number(unit.foods.find(food => food.name ===foodname).amount);
    unit.foods.find(food => food.name ===foodname).amount = currentAmount + amount;
    console.log(1);
}else{
    unit.foods.push({
        "name": foodname,
        "amount": amount
    });
}

console.log(unit);