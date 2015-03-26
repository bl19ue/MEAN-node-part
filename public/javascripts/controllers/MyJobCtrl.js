angular.module('companyModule')
.controller('MyJobCtrl', ['$scope', 'company', 'myjobs', function($scope, company, myjobs){
	console.log("jobs=" + JSON.stringify(myjobs));
	$scope.jobs = myjobs.jobs;
	
	
}]);