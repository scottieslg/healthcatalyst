"use strict";

app.controller("UsersCtrl", ['$scope', 'userSvc', function ($scope, userSvc) {
	$scope.newUserModel = {};

	$scope.addNewUser = function () {
		userSvc.addNewUser($scope.newUserModel)
			.then(function success(userModel) {
				console.log("new id is " + userModel.id);

				$scope.clearUser();
			});

	}

	// This function will reset the form and clear all of the new user model data
	$scope.clearUser = function () {
		//$scope.newUserModel = {};

		$scope.userForm.$setPristine();
		$scope.userForm.$setUntouched();
	}
	

	$scope.$watch('userPhoto', function () {
		if (!$scope.userPhoto)
			return;

		var reader = new FileReader();
		reader.onload = function (e) {
			$scope.newUserModel.photo = e.target.result;
			console.log($scope.newUserModel.photo);
			$scope.$apply();
		};
		reader.readAsDataURL($scope.userPhoto);
	})
}]);