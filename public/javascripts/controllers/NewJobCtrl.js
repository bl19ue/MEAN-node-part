angular.module('companyModule')
.controller('NewJobCtrl', ['$scope', 'company', '$state', function($scope, company, $state){
	$scope.postJob = function(){
		console.log("company.company.companuname="+company.company.companuname);
		company.postMyJob({
			'jobtitle' : $scope.jobtitle,
			'jobdesc' : $scope.jobdesc,
			'jobskills' : $scope.jobskills,
			'company' : company.company.companyname
		});
		//$state.go('company');
	}
}]);