const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const firearm = require('./firearmRouter.js');
const food = require('./foodRouter.js');
app.set('port', process.env.PORT || 9090);
app.use(cors({
    origin: '*'
}));

app.use('/',firearm);
app.use('/',food);
app.all('*', function(req,res){
	res.status(404).send('<h1>요청하신 페이지는 없어요.</h1>');
});


const server = http.createServer(app).listen(app.get('port'), function(){
	console.log('9090 port open');
});