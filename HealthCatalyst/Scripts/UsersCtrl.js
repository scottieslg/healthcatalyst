"use strict";

app.controller("UsersCtrl", ['$scope', '$timeout', 'userSvc', function ($scope, $timeout, userSvc) {
	$scope.newUserModel = {};

	$scope.addNewUser = function () {
		userSvc.addNewUser($scope.newUserModel)
			.then(function success(userModel) {
				console.log("new id is " + userModel.Id);

				$scope.clearUser();
			});

	}

	// This function will reset the form and clear all of the new user model data
	$scope.clearUser = function () {
		$scope.newUserModel = {};

		$scope.userForm.$setPristine();
		$scope.userForm.$setUntouched();
	}

	$scope.$watch('userSearchString', function () {
		if (!$scope.userSearchString) {
			$scope.searching = false;
			$scope.searchResults = null;
			return;
		}

		$scope.searchResults = [];

		// It's annoying to see the Loading... spinner every time we search.
		// Only show it if we actually take longer than 1/2 second to return the results
		var displayLoadingAfterTimeout = $timeout(function() {
			$scope.searching = true;
		}, 250);
		
		// Go get the users from the server based on the search string
		userSvc.getFilteredUsers($scope.userSearchString)
			.then(function (users) {
				// If the spinner is going, turn it off
				$scope.searching = false;
				// If we came back faster than 250ms, kill the timer so we don't show the spinner
				$timeout.cancel(displayLoadingAfterTimeout);

				if (users && users.length > 0)
					$scope.searchResults = users;
				else
					$scope.searchResults = null;
			})
	});
	
	// This will take the file input and actually read the data so that we can display
	// it and also send it back to the server as an encoded string
	$scope.$watch('userPhoto', function () {
		if (!$scope.userPhoto)
			return;

		var reader = new FileReader();
		reader.onload = function (e) {
			$scope.newUserModel.photo = e.target.result;
			$scope.$apply();
		};
		reader.readAsDataURL($scope.userPhoto);
	})
}]);