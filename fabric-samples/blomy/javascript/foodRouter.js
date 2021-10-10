const foodChaincode = require('./foodChaincode.js');
const firearmChaincode = require('./firearmChaincode.js');
const express = require('express');


const router = express.Router();

router.route('/queryUnit/:affiliatedUnit').get((req,res)=>{
    const affiliatedUnit = String(req.params.affiliatedUnit);
    console.log('---------queryUnit호출---------');
    console.log(`affiliatedUnit = ${affiliatedUnit}`);
    foodChaincode.foodQuery(affiliatedUnit).then((value)=>{
        res.writeHead(200, {"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    });
});
router.route('/createUnit/:affiliatedUnit').get((req,res)=>{
    const affiliatedUnit = String(req.params.affiliatedUnit);
    foodChaincode.modifyFoodTransaction(['createUnit',affiliatedUnit]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    })
})
router.route('/checkinFood/:affiliatedUnit/:foodName/:amount').get((req,res)=>{
    const affiliatedUnit = String(req.params.affiliatedUnit);
    const foodName = String(req.params.foodName);
    const amount = String(req.params.amount);
    console.log('-------checkinFood 호출--------');
    console.log(`affiliatedUnit = ${affiliatedUnit} `)
    console.log(`foodName = ${foodName}`);
    console.log(`amount = ${amount}`);
    foodChaincode.modifyFoodTransaction(['checkinFood',affiliatedUnit,foodName,amount]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    })
})

router.route('/checkoutFood/:affiliatedUnit/:foodName/:amount').get((req,res)=>{
    const affiliatedUnit = String(req.params.affiliatedUnit);
    const foodName = String(req.params.foodName);
    const amount = String(req.params.amount);
    console.log('-------checkoutFood 호출--------');
    console.log(`affiliatedUnit = ${affiliatedUnit} `)
    console.log(`foodName = ${foodName}`);
    console.log(`amount = ${amount}`);
    foodChaincode.modifyFoodTransaction(['checkoutFood',affiliatedUnit,foodName,amount]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    })
})

router.route('/GetUnitHistory/:affiliatedUnit').get((req,res)=>{
    const affiliatedUnit = String(req.params.affiliatedUnit);
    console.log('--------GetUnitHistory 호출---------');
    console.log(`affiliatedUnit = ${affiliatedUnit}`)
    foodChaincode.modifyFoodTransaction(['GetUnitHistory',affiliatedUnit]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    })
})

router.route('/queryAllUnits').get((req,res)=>{
    console.log('-------queryAllUnits-------');
    foodChaincode.modifyFoodTransaction(['queryAllUnits']).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    })
})


module.exports = router