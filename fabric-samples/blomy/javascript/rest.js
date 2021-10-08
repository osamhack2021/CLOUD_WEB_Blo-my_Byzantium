const getHistory = require('./HistoryQuery.js')
const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors');


app.set('port', process.env.PORT || 3000);
app.use(cors());

const router = express.Router()

router.route('/').get((req,res)=>{
   res.send('<h1>test page</h1>')
})


router.route('/query').get((req,res)=>{
    const param = req.query.serial
    console.log(param)
    getHistory(param).then((value)=>{
        res.writeHead(200, {"Content-Type":'text/html;charset=utf8'});
		res.write(value)
		res.end()
        }
    )

})

app.use('/',router)
app.all('*', function(req,res){
	res.status(404).send('<h1>요청하신 페이지는 없어요.</h1>');
});


const server = http.createServer(app).listen(app.get('port'), function(){
	console.log('3000 port open')
})