'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupDetailsCtrl', [
        '$scope', '$stateParams', '$rootScope', 'groupService',
        function ($scope, $stateParams, $rootScope, groupService) {
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
            $scope.email = "";
            $scope.uid = $rootScope.user.id;

            /**
             * @description create members in the group
             */
            $scope.createMember = () => {
                groupService.createMember($scope.email, $scope.group.id).then(response => {
                    $scope.group.members = [...$scope.group.members, {user: response.user}]
                }, err => {});
            }

            $scope.removeMember = (id) => {
                groupService.removeMember(groupId, {"userId": id}).then(response=>{
                    $scope.getGroupDetails();
                }, err=>{
                    console.log(err);
                });
            }

            /**
             * @description Get group details
             */
            $scope.getGroupDetails = () => {
                groupService.getGroupDetails(groupId).then(response => {
                    $scope.group = response;
                }, err => {});
            }
            $scope.getGroupDetails();
        }]);
})();
