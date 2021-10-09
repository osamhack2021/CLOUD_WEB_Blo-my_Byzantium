const {getHistory, modifyTransaction} = require('./HistoryQuery.js');
const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');


app.set('port', process.env.PORT || 3000);
app.use(cors());

const router = express.Router();

// 의미없는 테스트 페이지 구현 웹페이지의 가장 초기화면 
router.route('/').get((req,res)=>{
   res.send('<h1>test page</h1>');
})


//query 요청에 대한 응답 부분 총기에관한 serial번호를 입력받아서 AssetHistory(transaction)을 json형태로 출력하는 부분
router.route('/query/:serial').get((req,res)=>{
    const serial = String(req.params.serial);
    console.log('------AssetHitory 호출--------')
    console.log(serial);
    console.log('------------------------------')
    getHistory(serial).then((value)=>{ // 하이퍼레저에서 query에 대한 응답을 가져오는 부분
        res.writeHead(200, {"Content-Type":'text/html;charset=utf8'});
		res.write(value);
		res.end();
        }
    )

})

router.route('/createFirearm/:serial/:firearm/:owner/:belong/:status/:reason').get((req,res)=>{
    const serial = String(req.params.serial);
    const firearm = String(req.params.firearm);
    const owner = String(req.params.owner);
    const belong = String(req.params.belong);
    const status = String(req.params.status);
    const reason = String(req.params.reason);
    console.log('---------총기 생성 호출----------');
    console.log(`serial = ${serial}`);
    console.log(`fiream = ${firearm}`);
    console.log(`owner = ${owner}`);
    console.log(`belong = ${belong}`);
    console.log(`status = ${status}`);
    console.log(`reason = ${reason}`);
    console.log('--------------------------------')
    modifyTransaction(['createFirearm',serial,firearm,owner,belong,status,reason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end()
    })
})

router.route('/checkoutFirearm/:serial/:status/:reason').get((req,res)=>{
    const serial = String(req.params.serial);
    const status = String(req.params.status);
    const reason = String(req.params.reason);
    console.log('-----총기 불출 호출------');
    console.log(`serial = ${serial}`);
    console.log(`status = ${status}`);
    console.log(`reason = ${reason}`);
    modifyTransaction(['checkoutFirearm',serial,status,reason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end()
    })
})

router.route('/checkinFirearm/:serial/:status/:reason').get((req,res)=>{
    const serial = String(req.params.serial);
    const status = String(req.params.status);
    const reason = String(req.params.reason);
    console.log('-------총기 반납 호출 ---------');
    console.log(`serial = ${serial}`);
    console.log(`status = ${status}`);
    console.log(`reason = ${reason}`);
    modifyTransaction(['checkinFirearm',serial,status,reason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end()
    })
})

router.route('/changeFirearmAttributes/:serial/:firearm/:owner/:belong/:status/:reason').get((req,res)=>{
    const serial = String(req.params.serial);
    const firearm = String(req.params.firearm);
    const owner = String(req.params.owner);
    const belong = String(req.params.belong);
    const status = String(req.params.status);
    const reason = String(req.params.reason);
    console.log('-------총기 속성 변경 호출-------');
    console.log(`serial = ${serial}`);
    console.log(`fiream = ${firearm}`);
    console.log(`owner = ${owner}`);
    console.log(`belong = ${belong}`);
    console.log(`status = ${status}`);
    console.log(`reason = ${reason}`);
    modifyTransaction(['changeFirearmAttributes',serial,firearm,owner,belong,status,reason]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end()
    });
})

router.route('/deleteFirearm/:serial').get((req,res)=>{
    const serial = String(req.params.serial);
    console.log(`serial=${serial}`);
    modifyTransaction(['deleteFirearm',serial]).then((value)=>{
        res.writeHead(200,{"Content-Type":'text/html;charset=utf8'});
        res.write(value);
        res.end()
    });
})


app.use('/',router);
app.all('*', function(req,res){
	res.status(404).send('<h1>요청하신 페이지는 없어요.</h1>');
});


const server = http.createServer(app).listen(app.get('port'), function(){
	console.log('3000 port open');
})