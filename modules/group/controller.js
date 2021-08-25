'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupCtrl', [
        '$scope', '$stateParams', 'groupService',
        function ($scope, $stateParams, groupService) {
			/*
			 {
                    "id": 28,
                    "name": "abcd",
                    "members": [
                        {
                            "id": 71,
                            "user": {
                                "first_name": "user",
                                "last_name": "user",
                                "email": "user@gmail.com",
                            },
                            "group": 28,
                            "created_at": "2021-08-24T06:14:30.085900",
                            "updated_at": "2021-08-24T06:14:30.086138"
                        },
                    ],
                    "created_by": 17,
                    "created_at": "2021-08-24T06:14:30.072120",
                    "updated_at": "2021-08-24T06:14:30.072519"
                },
			 */
            const id = $stateParams.id;
			$scope.group = {};
            $scope.addEmail = "";

            $scope.addMember = function () {
                groupService.addMember($scope.addEmail, $scope.group.id).then(response=>{
					$scope.group.members = [...$scope.group.members, {user: response.user}]
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
        }]);
})();
