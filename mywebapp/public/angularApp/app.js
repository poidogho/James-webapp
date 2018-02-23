angular.module('jamesinfotech', ['ngRoute']).config(config)

function config($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : 'angularApp/listArticles/articles.html',
			controller : ArticlesController,
			controllerAs: 'vm'
		})
		.when('/article/:id', {
			templateUrl : 'angularApp/displayArticles/article.html',
			controller : ArticleController,
			controllerAs: 'vm'
		});
}
