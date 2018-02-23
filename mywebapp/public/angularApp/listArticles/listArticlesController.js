angular.module('jamesinfotech').controller('ArticlesController', ArticlesController);

function ArticlesController($http){
	var vm = this;
	vm.title = "Welcome to James Infotech World";
	$http.get('/articles').then(function(response){
		//console.log(response);
		vm.articles = response.data;
		//console.log(vm.articles);
	});
}