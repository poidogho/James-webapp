//this class helps with connection to the server using express
//require('./api/data/dbconnection.js').open();
require ('./api/data/db.js');
var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');

app.set("port", 3000);

app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

//declaring our statiuc file path
//__dirname points to the root of the app
app.use(express.static(path.join(__dirname, 'public')));

//static direstore for express
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({extended : false}));
app.use('/', routes);



/*app.get('/file', function(req, res){
	console.log("GETTING A FILE");
	res
		.status(200)
		.sendFile(path.join(__dirname, 'app.js'));
});*/

var server = app.listen(app.get("port"), function(){
	var port = server.address().port;
	console.log("connected to port  " + port);
});