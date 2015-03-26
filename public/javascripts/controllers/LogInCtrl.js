angular.module('companyModule')
.controller('LogInCtrl', ['$scope', '$state', 'company', function($scope, $state, company){

	$scope.checkUser = function(){
		company.logIn({
			username: $scope.username,
			password: $scope.password
		});
		$scope.username = '';
		$scope.password = '';

	};
	
	$scope.signUp = function(){
		if($scope.companypassword !== $scope.verifypassword){ 
			console.log('Password Did not match');
			return; 
		}
		company.signUp({
			'companyname' : $scope.companyname,
			'username' : $scope.companyusername,
			'password' : $scope.companypassword
			
		});
		
		$scope.companyname = '';
		$scope.companyusername = '';
		$scope.companypassword = '';
	}
}]);