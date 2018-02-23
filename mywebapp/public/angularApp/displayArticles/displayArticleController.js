angular.module('jamesinfotech').controller('ArticleController', ArticleController);

function ArticleController($http, $routeParams){
	var vm = this;
	var id = $routeParams.id;
	$http.get('/articles/' + id).then(function(response){
		vm.article = response.data
	});
}