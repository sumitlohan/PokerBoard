'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupListCtrl', [
        '$scope', 'groupListService',
        function ($scope, groupListService) {
            /*
            Pattern of data that is to be stored in $scope.groups ->
            [
                {
                    "id": <int>,
                    "name": "<string>",
                    "members": [
                        {
                            "id": <int>,
                            "user": {
                                "first_name": "<string>",
                                "last_name": "<string>",
                                "email": "<string>",
                            },
                            "group": <int>,
                            "created_at": "<datetime>",
                            "updated_at": "<datetime>"
                        },
                    ],
                    "created_by": <int>,
                    "created_at": "<datetime>",
                    "updated_at": "<datetime>"
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
