angular.module('companyModule')
.factory('company', ['$http', '$state',function($http, $state){
	var o = {
		company: []	
	};

	o.logIn = function(company){
		return $http.post('/company', company).then(function(res){

			if(res.data.problem == "NA"){
				return;
			}
			else{
				angular.copy(res.data, o.company);
				$state.go('company');
			}
		});
	}

	o.getJobs = function(){
		//console.log("id=" + id);
		return $http.get('/company/' + o.company._id + '/jobs').then(function(res){
			console.log("res.data for job = " + JSON.stringify(res.data));
			return res.data;
		});
	}

	o.signUp = function(company){
		console.log("company in signUp=" + company);
		return $http.post('/company/signup', company).then(function(res){
			console.log("res data for signup = " + res.data);
			angular.copy(res.data, o.company);
			$state.go('company');
		});
	}
	
	o.postMyJob = function(job){
		return $http.post('/company/' + o.company._id + '/jobs', job).then(function(res){
			console.log("res data for new job = " + res.data.company);
			//$state.go('myjobs');
		});
	}

	return o;
}]);