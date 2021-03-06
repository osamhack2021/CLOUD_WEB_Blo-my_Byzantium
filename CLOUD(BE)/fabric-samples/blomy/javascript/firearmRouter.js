const foodChaincode = require('./foodChaincode.js');
const firearmChaincode = require('./firearmChaincode.js');
const express = require('express');


const router = express.Router();
// 의미없는 테스트 페이지 구현 웹페이지의 가장 초기화면 
router.route('/').get((req,res)=>{
   res.send('<h1>test page</h1>');
});

//query 요청에 대한 응답 부분 총기에관한 serial번호를 입력받아서 AssetHistory(transaction)을 json형태로 출력하는 부분
router.route('/query/:serialNumber').get((req,res)=>{
    const serialNumber = String(req.params.serialNumber);
    console.log('------AssetHitory 호출--------');
    console.log(`serialNumber = ${serialNumber}`);
    firearmChaincode.firearmQuery(serialNumber).then((value)=>{ // 하이퍼레저에서 query에 대한 응답을 가져오는 부분
        res.writeHead(200, {"Content-Type":'text/html;charset=utf8'});
		res.write(value);
		res.end();
        });
});

router.route('/createFirearm/:serialNumber/:model/:owner/:affiliatedUnit/:status/:updateReason').get((req,res)=>{
    const serialNumber = String(req.params.serialNumber);
    const model = String(req.params.model);
    const owner = String(req.params.owner);
    const affiliatedUnit = String(req.params.affiliatedUnit);
    const status = String(req.params.status);
    const updateReason = String(req.params.updateReason);
    console.log('---------총기 생성 호출----------');
    console.log(`serial = ${serialNumber}`);
    console.log(`fiream = ${model}`);
    console.log(`owner = ${owner}`);
    console.log(`belong = ${affiliatedUnit}`);
    console.log(`status = ${status}`);
    console.log(`updateReason = ${updateReason}`);
    firearmChaincode.modifyFirearmTransaction(['createFirearm',serialNumber,model,owner,affiliatedUnit,status,updateReason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    });
});

router.route('/checkoutFirearm/:serialNumber/:status/:updateReason').get((req,res)=>{
    const serialNumber = String(req.params.serialNumber);
    const status = String(req.params.status);
    const updateReason = String(req.params.updateReason);
    console.log('-----총기 불출 호출------');
    console.log(`serialNumber = ${serialNumber}`);
    console.log(`status = ${status}`);
    console.log(`updateReason = ${updateReason}`);
    firearmChaincode.modifyFirearmTransaction(['checkoutFirearm',serialNumber,status,updateReason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    });
});

router.route('/checkinFirearm/:serialNumber/:status/:updateReason').get((req,res)=>{
    const serialNumber = String(req.params.serialNumber);
    const status = String(req.params.status);
    const updateReason = String(req.params.updateReason);
    console.log('-------총기 반납 호출 ---------');
    console.log(`serialNumber = ${serialNumber}`);
    console.log(`status = ${status}`);
    console.log(`updateReason = ${updateReason}`);
    firearmChaincode.modifyFirearmTransaction(['checkinFirearm',serialNumber,status,updateReason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    });
});

router.route('/changeFirearmAttributes/:serialNumber/:model/:owner/:affiliatedUnit/:status/:updateReason').get((req,res)=>{
    const serialNumber = String(req.params.serialNumber);
    const model = String(req.params.model);
    const owner = String(req.params.owner);
    const affiliatedUnit = String(req.params.affiliatedUnit);
    const status = String(req.params.status);
    const updateReason = String(req.params.updateReason);
    console.log('-------총기 속성 변경 호출-------');
    console.log(`serialNumber = ${serialNumber}`);
    console.log(`model = ${model}`);
    console.log(`owner = ${owner}`);
    console.log(`affiliatedUnit = ${affiliatedUnit}`);
    console.log(`status = ${status}`);
    console.log(`updateReason = ${updateReason}`);
    firearmChaincode.modifyFirearmTransaction(['changeFirearmAttributes',serialNumber,model,owner,affiliatedUnit,status,updateReason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    });
});

router.route('/deleteFirearm/:serialNumber').get((req,res)=>{
    const serialNumber = String(req.params.serialNumber);
    console.log('-------총기 삭제---------');
    console.log(`serialNumber = ${serialNumber}`);
    firearmChaincode.modifyFirearmTransaction(['deleteFirearm',serialNumber]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    });
});

router.route('/queryAllFirearms').get((req,res)=>{
    console.log('------모든 총기 조회-------');
    firearmChaincode.modifyFirearmTransaction(['queryAllFirearms']).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end();
    });
});

module.exports = router;