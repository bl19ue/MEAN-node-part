angular.module('companyModule')
.controller('CompanyHomeCtrl', ['$scope', '$state', 'company', function($scope, $state, company){
	$scope.what = "Logged In";
	$scope.company = company.company;
	console.log("company with jobs = " + company);
	$scope.myJobs = function(){
		$state.go('myjobs');
	}
}]);