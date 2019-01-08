var app = angular.module('civ', ['ui.bootstrap','ui.sortable','ngSanitize', 'ui.select', 'ngResource']);

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

app.factory('api', ['$http','$resource','$httpParamSerializerJQLike', function($http,$resource,$httpParamSerializerJQLike) {
  var api = {
  	'load_tags': function(scope, search, category, filter){
  		if(!scope.tags){scope.tags = []}
  		if(scope.tags.length > 0 || !search){return}
  		$http({
              url: '/mentorme/api/get_tags/',
              method: 'GET',
              params: {'category':category},
              paramSerializer: '$httpParamSerializerJQLike'
            }).then(
                function(data){
                	scope.tags = _.filter(data.data, function(tag){ 
                		return !_.some(filter, function(ftag){ return ftag.name == tag.name}) ; 
                	});

                    //scope.tags = data.data
                },
                function(error){
                    //error
                }
            )	
  	 },
  	 'book': $resource('/mentorme/api/book/:id',{id: '@id'}, {}),
  	 'suggestion': $resource('/mentorme/api/suggestion/:id',{id: '@id'}, {}),
  	 'article': $resource('/mentorme/api/article/:id',{id: '@id'}, {}),
  }

  return api;
}]);

app.config(['$resourceProvider', function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false
    $resourceProvider.defaults.actions.get_my = {
      method: 'GET', isArray:true, params:{'my':true}
    };
    $resourceProvider.defaults.actions.search = {
      method: 'GET', isArray:true, params:{'search':true}
    };
}]);
