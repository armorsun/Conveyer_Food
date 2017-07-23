var http = require('http');
var express= require('express');
var app = express();
var mysql = require('mysql');
var dbconnect;
var myurl= require('url');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var server = http.createServer(app, function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

var io = require('socket.io').listen(server);

app.use(express.static(__dirname + "/food_share/"));
app.use(express.static(__dirname + "/food_share/css"));
app.use(express.static(__dirname + "/food_share/js"));
app.use(express.static(__dirname + "/food_share/img"));
app.use(express.static(__dirname + "/food_share/less"));
app.use(express.static(__dirname + "/food_share/vendor"));
app.use(express.static(__dirname + "/food_share/video"));

function handleError(){
    dbconnect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2017Hackntu0721',
        database: 'FOOD',
        port: 3306
    });

    dbconnect.connect(function (err){
        if(err){
            console.log('error when connecting to db', err);
            setTimeout(handleError, 2000);
        }
    });

    dbconnect.on('error', function(err){
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONECTION_LOST'){
            handleError();
        }else{
            throw err;
        }
    });
}
handleError();

server.listen(8000, function(){
	console.log('Server running at http://23.99.56.84:8000/');
});
var connection = null;
io.sockets.on('connection', function(socket){
	connection = socket;
});

app.post("/get_stocks", jsonParser, function(req, res) {
	var vm_location = req.body.vm_location;
	dbconnect.query("select class, name, expiry_date, number, price from STOCK where location='SkyDragonCountry'", function (err, results){
	if(err) throw err;
	console.log('recevied')
//	res.setHeader('Access-Control-Allow-Origin', "*");
	res.send(results);
	});
});


app.post("/bought", jsonParser, function(req, res) {
	var vm_location = req.body.vm_location;
	for (i=0; i<req.body.stocks.length; i++){
		var stock=dbconnect.query("update STOCK set number=" + req.body.stocks[i][1] + " where location=\'" + vm_location + "\' AND name=\'" + req.body.stocks[i][0] + "\'");

        }
	connection.emit('bought', req.body.stocks);
	res.send("received");
});


