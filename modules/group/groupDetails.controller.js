'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupDetailsCtrl', [
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
            const groupId = $stateParams.id;
            $scope.addEmail = "";

            $scope.createMember = () => {
                //create members in the group
                groupService.createMember($scope.addEmail, $scope.group.id).then(response=>{
                    $scope.group.members = [...$scope.group.members, {user: response.user}]
                }, err=>{});
            }

            $scope.getGroupDetails = () => {
                // Get group details
                groupService.getGroupDetails(groupId).then(response=>{
                    $scope.group = response;
                }, err=>{});
            }
            $scope.getGroupDetails();
        }]);
})();