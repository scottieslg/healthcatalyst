"use strict";

app.factory("userSvc", ['$http', '$q', function ($http, $q) {
	function addNewUser(userModel) {
		var deferred = $q.defer();

		$http.post("/api/users/addnewuser", userModel)
			.then(function addUserSuccess(response) {
				deferred.resolve(response.data);
			},
			function addUserException(response) {
				console.log(response);
				// Add some user exception code here...
				deferred.reject(response);
			})

		return deferred.promise;
	}

	return {
		addNewUser: addNewUser
	}
}]);