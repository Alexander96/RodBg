app.factory("OpinionService", function($q, $http){
	function getAllOpinions(){
		var deferred = $q.defer();
		$http.get('/opinions').success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.resolve(false);
		});

		return deferred.promise;
	}
	return {
		getAllOpinions: getAllOpinions
	}
})