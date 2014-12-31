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
				controller: 'OneNewsCtrl',
				resolve: {										//Now this will help us to get a particular news
					onenews: ['$stateParams', 'news', function($stateParams, news){	//No need for $stateParams in the NewsCtrl
						return news.get($stateParams.id);		//Cause this also ensures that when this state is requested
					}]											//we can get the Id for that news
				}
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
		
		//Now for creating news and persisting them to database we need a query function
		o.create = function(news){
			return $http.post('/news', news).success(function(data){
				o.news.push(data);
			});
		};
		
		//Upvoting a news
		o.upvote = function(news){
			return $http.put('/news/' + news._id + '/upvote').success(function(data){
				news.upvotes += 1;
			});
		};
		
		//Get function to return single news from the server
		o.get = function(id){									
			console.log("id=" + id);
			return $http.get('/news/' + id).then(function(res){		//Calling get to retrieve a single news
				console.log("data=" + res.data);
				return res.data;									//.then is actually a "promise" in angular which means 
			});														//that after the GET is completed it is sure to be called
		};
		
		return o;
	}])

	.controller('NewsCtrl', ['$scope', 'news', function($scope, news){	//Controller for all the logic
		$scope.say_hello = "Hey!!!!!!";
		$scope.news = news.news;									//Binding of news, so that this array can be used outside
		
		$scope.addNews = function(){								//A function to add a news
			if(!$scope.title || $scope.title === '') {return;}		//Preventing user to input empty title
			//Default news gone, now we need to call the create method only to add a news to the database
			
			news.create({
				title: $scope.title,
				link: $scope.link,
			});
			$scope.title = '';
			$scope.link = '';
		};
		
		$scope.increaseVotes = function(n){							//As n means a news only so its property upvotes		
			news.upvote(n);											//Now calling the upvote in the service
		};	
		
		
		
	}])

	.controller('OneNewsCtrl', [									//Another controller for controlling single news
	'$scope',
	'news',															//Providing the news object
	'onenews',
	function($scope, news, onenews){
		console.log(onenews);
		$scope.onenews = onenews;				//getting a particular news from onenews already passed
		
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
