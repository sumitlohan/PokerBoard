'use strict';
(function () {
	angular.module('pokerPlanner').controller('groupCtrl', [
		'$scope', '$stateParams', 'groupService',
		function ($scope, $stateParams, groupService) {
			const id = $stateParams.id;
			$scope.addEmail = "";

			$scope.addMember = function () {
				groupService.addMember($scope.addEmail, $scope.group.id).then(response=>{
					$scope.getGroup();
				})
				.catch(err=>{});
			}
			$scope.getGroup = function () {
				groupService.getGroup(id).then(response=>{
					$scope.group = response;
				})
				.catch(err=>{});
			}
			$scope.getGroup();
			$scope.group = {};
		}]);
})();
