'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupListCtrl', [
        '$scope', 'groupListService',
        function ($scope, groupListService) {
            /*
			Groups ->
            [
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
            ]
            */
            $scope.groups = [];
            $scope.groupName = "";
            $scope.createGroup = function () {
                groupListService.createGroup({name: $scope.groupName}).then(response=>{
                    $scope.groups = [...$scope.groups, response];
                })
                .catch(err=>{})
            }

            $scope.getGroups = function () {
                groupListService.getGroups().then(response=>{
                  $scope.groups = response;
                })
                .catch(err=>{})
            }
            $scope.getGroups();
        }]);

})();
