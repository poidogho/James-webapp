
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

//getting all the reviews of a particular article
module.exports.getAllReviews = function(req, res){
	var articleId = req.params.articleId;

	console.log("get Article with ID",articleId);
	
	Article
		.findById(articleId)
		//to return only the reviews so as to avoid lots part of the db to be used for query
		.select('reviews')
		.exec(function(err, doc){
			res
				.status(200)
				.json(doc.reviews);
		});
};

//getting a single review for an article
module.exports.getOneReview = function(req, res){
	var articleId = req.params.articleId;
	var reviewId = req.params.reviewId;

	console.log("get reviewID " + reviewId + "for hotelid" + articleId);

	Article
		.findById(articleId)
		.select('reviews')
		.exec(function(err, article){
			console.log("Returned article", article);
			var review = article.reviews.id(reviewId);
			res
				.status(200)
				.json(review)
		});
};

//helper method to save a review
var _addNewReview = function(req, res, article){
	article.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});

	//the whole article has to be saved as only the subdocument(review can be saved
	article.save(function(err, articleUpdated){
		if(err){
			res
				.status(500)
				.json(err);
		}else{
			res
				.status(201)
				.json(articleUpdated.reviews[articleUpdated.reviews.length - 1]);
		}
	})
};

//adding a review
module.exports.addReview = function(req, res){
	var articleId = req.params.articleId;
	console.log("get Article with ID",articleId);
	
	Article
		.findById(articleId)
		//to return only the reviews so as to avoid lots part of the db to be used for query
		.select('reviews')
		.exec(function(err, doc){
			var response = {
				status : 200,
				message : []
			};
			if(err){
				console.log("error finding the review");
				response.status = 500;
				response.message = err;
			}else if(!doc){
				console.log("review ID not found", id);
				response.status = 404;
				response.message = {
					"message" : "Hotel ID not found" + id
				};
			}if(doc){
				_addNewReview(req, res, doc);
			}else{
				res
					.status(response.status)
					.jason(response.message);
			}
		});
};

//method to update a review
module.exports.updateOneReview = function(req, res){
	var articleId = req.params.articleId;
	var reviewId = req.params.reviewId;

	Article
		.findById(articleId)
		.select("reviews")
		.exec(function(err, article){
			var thisReview;
			var response = {
				status : 200,
				message : {}
			};
			if(err){
				console.log("Error finding the article");
				response.status = 500;
				response.message = err;
			}else if (!article){
				console.log("article id not found");
				response.status = 404;
				response.message = {
					"message" : " article ID not found"
				};
			}else{
				//lets get the particlular review to be updated
				thisReview = article.reviews.id(reviewId);
				//if review does not exist
				if(!thisReview){
					console.log("review not found");
					response.status = 404;
					response.message = {
						"message" : " reviewId not found" + reviewId
					};
				}
			}if(response.status !=200){
				res
					.status(response.status)
					.json(response.message);
			}else{
				thisReview.name = req.body.name;
        		thisReview.rating = parseInt(req.body.rating, 10);
        		thisReview.review = req.body.review;
        		article.save(function(err, updatedArticle){
        			if(err){
        				res
        					.status(500)
        					.json(err);
        			}else{
        				res
        					.status(204)
        					.json();
        			}
        		});
			}
		});
};

//deleting a review sub document  
module.exports.deleteOneReview = function(req, res){
	var articleId = req.params.articleId;
	var reviewId = req.params.reviewId;

	Article
		.findById(articleId)
		.select("reviews")
		.exec(function(err, article){
			var thisReview;
			var response = {
				status : 200,
				message : {}
			};
			if(err){
				console.log("Error finding the article");
				response.status = 500;
				response.message = err;
			}else if (!article){
				console.log("article id not found");
				response.status = 404;
				response.message = {
					"message" : " article ID not found"
				};
			}else{
				//lets get the particlular review to be updated
				thisReview = article.reviews.id(reviewId);
				//if review does not exist
				if(!thisReview){
					console.log("review not found");
					response.status = 404;
					response.message = {
						"message" : " reviewId not found" + reviewId
					};
				}
			}if(response.status !=200){
				res
					.status(response.status)
					.json(response.message);
			}else{
				article.reviews.id(reviewId).remove();
        		article.save(function(err, updatedArticle){
        			if(err){
        				res
        					.status(500)
        					.json(err);
        			}else{
        				res
        					.status(204)
        					.json();
        			}
        		});
			}
		});
};