angular.module('companyModule', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: '/login.html',
		controller: 'LogInCtrl'
	})
	.state('company', {
		url: '/company',
		templateUrl: '/company.html',
		controller: 'CompanyHomeCtrl'
	})
	.state('newjob', {
		url: '/newjob',
		templateUrl: '/newjob.html',
		controller: 'NewJobCtrl'
	})
	.state('myjobs', {
		url: '/jobs',
		templateUrl: '/jobs.html',
		controller: 'MyJobCtrl',
		resolve: {

			myjobs: ['company', function(company){
				
				var jobs = company.getJobs();	
				
				return jobs;
			}]
		}
	});
	$urlRouterProvider.otherwise('login');
}]);