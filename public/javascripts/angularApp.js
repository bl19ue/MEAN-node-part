angular.module('myNews', ['ui.router'])								//Included UI router same as ng-route but better

.config(['$stateProvider', '$urlRouterProvider', 					//After including ui.router, we want to configure it
		 function($stateProvider, $urlRouterProvider){
		 	$stateProvider
			.state('home', {										//Setting up of home route
				url: '/home',									//Real path URL
				templateUrl: '/home.html',						//What it will really show 
				controller: 'NewsCtrl',							//This state will be controlled by NewsCtrl
				resolve:{										//Resolve is used to ensure that even before the state is loaded, all the news will be queried
					newsPromise: ['news', function(news){
						return news.getAll();
					}]
				}
			})
			.state('news', {
				url: '/news/{id}',
				templateUrl: '/news.html',
				controller: 'OneNewsCtrl'
			});
			 $urlRouterProvider.otherwise('home');					//Finally otherwise() is used so that if any other URL is received, it should always go to state 'home'
		 }])

	//+http injected	//A factory to contain all the news and other related stuff
	.factory('news',  ['$http', function($http){		
		//service body
		var o = {
			news: []										//No more default news as we are going to copy news from database
		};

/*=============== Call this from whenever you want all the news to be shown, for this we need to call it from home state=============================*/
		o.getAll = function(){														//This function gets all of the news from the /news GET requests, if there is any response, success method is called
			return $http.get('/news').success(function(data){						//http is used to use GET request from here
				angular.copy(data, o.news);											//angular copy is used cause it will update the UI properly
			});								
		};
		return o;
	}])

	.controller('NewsCtrl', ['$scope', 'news', function($scope, news){	//Controller for all the logic
		$scope.say_hello = "Hey!!!!!!";
		$scope.news = news.news;									//Binding of news, so that this array can be used outside
		
		$scope.addNews = function(){								//A function to add a news
			if(!$scope.title || $scope.title === '') {return;}		//Preventing user to input empty title
			$scope.news.push({
				title 	: $scope.title,
				upvotes	: 0,
				link	: $scope.link,
				comments: [
					{author: 'Sumit', body: 'Good news', upvotes: 0},
					{author: 'Ken', body: 'Wow!', upvotes: 0}
				]
			});	//Now pushing custom news
			$scope.title = '';
		};
		
		$scope.increaseVotes = function(n){							//As n means a news only so its property upvotes			
			n.upvotes += 1;											//directly referenced, hence increasing it will 
		};															//get reflected on the view
		
		
		
	}])

	.controller('OneNewsCtrl', [									//Another controller for controlling single news
	'$scope',
	'$stateParams',													//StateParams contains parameters passed onto an URL
	'news',															//Providing the news object
	function($scope, $stateParams, news){
		$scope.onenews = news.news[$stateParams.id];				//getting a particular news using stateparams and getting the id parameter from the URL
		
		$scope.increaseCommentVotes = function(comment){			//For comment's voting				
			comment.upvotes += 1;									
		};
		
		$scope.addComment = function(){								//This adds comment to a single news
			if($scope.body === '') { return; }
			$scope.onenews.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
		};
	}]);
