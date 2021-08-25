'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupCtrl', [
        '$scope', '$stateParams', 'groupService',
        function ($scope, $stateParams, groupService) {
            /*
            Pattern of data that is to be stored in $scope.group ->
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
             */
            $scope.group = {};
            const id = $stateParams.id;
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
