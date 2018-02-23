var mongoose = require('mongoose');

var dburl = 'mongodb://localhost:27017/jamesdb';

mongoose.connect(dburl);

//method to listen to mongoose connections
mongoose.connection.on('connected', function(){
	console.log("App connected to " + dburl);
});

//method to disconnect from mongoose connections
mongoose.connection.on('disconnected', function(){
	console.log("App is disconneted");
});

//method to check error in connection
mongoose.connection.on('error', function(err){
	console.log("App connection error: " + err);
});

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGINT)');
		process.exit(0);
	});
});

process.on('SIGTERM', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGTERM)');
		process.exit(0);
	});
});

process.once('SIGUSR2', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGUSR2)');
		process.kill(process.pid, 'SIGUSR2');
	});
});

//bringing in the schema and model
require('./articles.model.js');