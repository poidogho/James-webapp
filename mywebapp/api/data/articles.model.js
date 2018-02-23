var mongoose = require('mongoose');

//a sub document schema for review
var reviewSchema = new mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	rating:{
		type: Number,
		min : 0,
		max : 5,
		required: true
	},
	review : {
		type : String,
		required : true
	},
	createdOn : {
		type: Date,
		"default" : Date.now
	}


});

var articleSchema = new mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	stars:{
		type: Number,
		min : 0,
		max : 5,
		default: 0
	},
	photos: [String],
	articles: [String],
	services: [String],
	reviews : [reviewSchema],
	//location is an object
	location:{
		address : String,
		//cordinates must be in order of long, lat
		cordinates: {
			type : [Number],
			index : '2dsphere'
		}
	}
});

//compiling the schema into a model
mongoose.model('Article', articleSchema, 'myarticles');