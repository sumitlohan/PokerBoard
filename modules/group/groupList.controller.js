'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupListCtrl', [
        '$scope', 'groupService',
        function ($scope, groupService) {
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

            /**
             * @description create a group
             */
            $scope.createGroup = () => {
                groupService.createGroup({name: $scope.groupName}).then(response => {
                    $scope.groups = [...$scope.groups, response];
                }, err => {})
            }

            /**
             * @description get group list
             */
            $scope.getGroupsList = () => {
                groupService.getGroupsList().then(response => {
                  $scope.groups = response;
                }, err => {})
            }
            $scope.getGroupsList();
        }]);

})();
