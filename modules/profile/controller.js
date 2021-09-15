'use strict';
(function () {
    angular.module('pokerPlanner').controller('profileCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', '$mdToast', 'groupService', 'pokerboardService',
        'profileService', 'APP_CONSTANTS',
        function (
            $scope, $rootScope, $state, $cookies, $mdToast, groupService, pokerboardService, profileService,
            APP_CONSTANTS,
        ) {
            $scope.passNote = APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_VALIDATION;
            $scope.votes = [];
            const init = function () {
                $scope.email = $rootScope.user.email;
                $scope.firstname = $rootScope.user.first_name;
                $scope.lastname = $rootScope.user.last_name;

                profileService.getVotes().then(response => {
                    $scope.votes = response;
                });

                pokerboardService.getPokerboards().then(response => {
                    $scope.pokerboardList = [];
                    const parse = ele => {
                        $scope.pokerboardList.push({
                            title: ele.title,
                            description: ele.description,
                            status: APP_CONSTANTS.POKERBOARD_STATUS[ele.status],
                        });
                    }
                    response.forEach(parse);
                });

                groupService.getGroupsList().then(response => {
                    $scope.groupList = [];
                    const parse = ele => {
                        $scope.groupList.push({
                            name: ele.name,
                            createdAt: new Date(ele.created_at).toLocaleDateString(),
                        });
                    }
                    response.forEach(parse);
                });
            };

            init();

            $scope.onSubmit = () => {
                /* User is trying to change password or other data */
                const data = !$scope.password ? { first_name: $scope.firstname, last_name: $scope.lastname } : { first_name: $scope.firstname, last_name: $scope.lastname, password: CryptoJS.SHA256($scope.password).toString()};
                profileService.updateUser($rootScope.user.id, data).then(response => {
                    $mdToast.show($mdToast.simple().textContent("Profile Update Successful"));
                }, error => {
                    $scope.errorMsg = error.data.password[0];
                });
            };
        }
    ]);
})()
