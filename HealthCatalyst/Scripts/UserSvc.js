"use strict";

app.factory("userSvc", ['$http', '$q', function ($http, $q) {
	var longWaitCount = 0;

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

	function getFilteredUsers(searchString) {
		var longWait = ++longWaitCount % 3 === 0;
		var params = {
			searchString: searchString,
			longWait: longWait
		}

		var deferred = $q.defer();

		$http.get("/api/users/getfilteredusers", { params: params })
			.then(function getFilteredUsersSuccess(response) {
				deferred.resolve(response.data);
			},
			function getFilteredUsersException(response) {
				console.log(response);
				// Add some user exception code here...
				deferred.reject(response);
			})

		return deferred.promise;
	}

	return {
		addNewUser: addNewUser,
		getFilteredUsers: getFilteredUsers
	}
}]);