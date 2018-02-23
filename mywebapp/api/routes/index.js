//importing express and instantiating router
var express = require('express');
var router = express.Router();

//importing the controllers
var articleControllers = require ('../controllers/articles.Controllers.js');
var reviewControllers = require ('../controllers/review.Controllers.js');
//creating json route
router
	.route('/articles')
	.get(articleControllers.getAllArticles)
	.post(articleControllers.addOneArticle);

router
	.route('/articles/:articleId')
	.get(articleControllers.getOneArticle)
	.put(articleControllers.updateOneArticle)
	.delete(articleControllers.deleteOneArticle);


//review routes
router
	.route('/articles/:articleId/reviews')
	.get(reviewControllers.getAllReviews)
	.post(reviewControllers.addReview);

router
	.route('/articles/:articleId/reviews/:reviewId')
	.get(reviewControllers.getOneReview)
	.put(reviewControllers.updateOneReview)
	.delete(reviewControllers.deleteOneReview);

module.exports = router;