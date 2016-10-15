"use strict";

app.factory("userSvc", ['$http', '$q', function ($http, $q) {
	// Used to determine if we should wait for a long pause before returning data
	var longWaitCount = 0;

	// Adds a new user to the database
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

	// Grabs a list of users filtered by the search string
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