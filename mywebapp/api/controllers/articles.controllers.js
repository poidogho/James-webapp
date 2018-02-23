//var dbconn = require('../data/dbconnection.js');
//mogodb helper library to help get objectid
//var ObjectId = require('mongodb').ObjectId;

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

module.exports.getAllArticles = function (req, res){
	//var db = dbconn.get();
	//var collection = db.collection('myarticles');

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	if(isNaN(offset) || isNaN(count)){
		res
			.status(400)
			.json({"message": "count and offset must be numbers"});
		return;
	}

	if(count > maxCount){
		res
			.status(400)
			.json({"message" : "maximum count limit of" + maxCount + "exceeded"});
		return;
	}

	Article
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err, articles){
			if(err){
				res.
					status(500) //internal server error
					json(err);
			}else{
				console.log("Articles found", articles.length);
				res
					.json(articles);
			}
			
		});
	
	//var docs = collection.find();...this did not return a doc
	/*collection
		.find()
		.skip(offset)
		.limit(count)
		.toArray(function(err, docs){
			console.log("getting Articles", docs);
			res
				.status(200)
				.json(docs);
		});*/

	
};

module.exports.getOneArticle = function(req, res){
	var articleId = req.params.articleId;

	console.log("get Article with ID",articleId);
	
	Article
		.findById(articleId)
		.exec(function(err, doc){
			if(err){
				console.log('error finding document');
				res
					.status(500)
					.json(err);
			}else if(!doc){
				res
					.status(404) //document not found
					.json({"message" : "article ID not found"});

			}else{
				res
					.status(200)
					.json(doc);
			}
			
		});
		//using native mongodb driver
		/*.findOne({_id : ObjectId(articleId)}, function(err, doc){
			res
				.status(200)
				.json(doc);
		});*/
	

};

var _splitArray = function(input){
	var output;
	if(input && input.length > 0){
		output = input.split(";");
	}else{
		output = [];
	}
	return output;
};

module.exports.addOneArticle = function(req, res){

	Article
		.create({
			name : req.body.name,
			decription: req.body.description,
			stars : parseInt(req.body.stars, 10),
			photos: _splitArray(req.body.photos),
			location: {
				address: req.body.address,
				coordinates : [
				parseFloat(req.body.lng), parseFloat(req.body.lat)] 
			},
			article : req.body.article,
			services : _splitArray(req.body.services)
		}, function(err, article){
			if(err){
				console.log("error occured while addint an article");
				res
					.status(400)
					.json(err);
			}else{
				console.log("Article created, article");
				res
					.status(201) //object created status code
					.json(article);
			}
		});
	/*var db = dbconn.get();
	var collection = db.collection('myarticles');
	var newArticle;

	console.log("Add a new Article");

	if (req.body && req.body.name && req.body.stars){
		newArticle = req.body;
		newArticle.stars = parseInt(req.body.stars, 10);

		collection.insertOne(newArticle, function(err, response){
			console.log(response);
			console.log(response.ops);
			res
				.status(201)
				.json(response.ops);
		});
		
	}else{
		console.log("Error adding the article");
		res
			.status(400)
			.json({message : "Required data missing from the body"});
	}*/
	
};

//method to update an article
module.exports.updateOneArticle = function(req, res){
	var articleId = req.params.articleId;
	console.log("articleId id gotten", articleId);

	Article
		.findById(articleId)
		.select("-reviews")
		.exec(function(err, doc){
			var response = {
				status : 200,
				message : doc
			};
			if(err){
				response.status = 500;
				response.message = err;
			}else if(!doc){
				response.status = 404;
				response.message = {
					"message" : "Article ID not found"};
			}
			if (response.status != 200){
				res
					.status(response.status)
					.json(response.message);
			}else {
				doc.name = req.body.name;
				doc.decription = req.body.description;
				doc.stars = parseInt(req.body.stars, 10);
				doc.photos= _splitArray(req.body.photos);
				doc.location= {
					address: req.body.address,
					coordinates : [
						parseFloat(req.body.lng), parseFloat(req.body.lat)] 
				};
				doc.article = req.body.article;
				doc.services = _splitArray(req.body.services);

				doc.save(function(err, updatedDoc){
					if(err){
						res
							.status(500)
							.json(err);
					}else{
						res
							.status(204)
							.json();
					}
				})
			}
		});
};

module.exports.deleteOneArticle = function(req, res){
	var articleId = req.params.articleId;

	Article
		.findByIdAndRemove(articleId)
		.exec(function(err, deletedArticle){
			if(err){
				res
					.status(404)
					.json(err);
			}else{
				console.log("Article has being deleted");
				res
					.status(204)
					.json();
			}
		});
};
