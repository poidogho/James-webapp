var MongoClient = require('mongodb').MongoClient;

//connection string for mongo db
var dburl = 'mongodb://localhost:27017/jamesdb';
var _connection = null;

var open = function(){
	//setting up the connection to db
	MongoClient.connect(dburl, function(err, db){
		if(err){
			console.log("Unable to conect to database");
			return;
		}
		_connection = db;
		console.log( "connection to DB successful", db);
	});
};

var get = function(){
	return _connection;
}

module.exports = {
	open : open,
	get  : get
};