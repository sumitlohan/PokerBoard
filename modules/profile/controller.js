'use strict';
(function () {
    angular.module('pokerPlanner').controller('profileCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'pokerboardService', '$mdToast', 'groupService',
        'profileService', 'APP_CONSTANTS',
        function (
            $scope, $rootScope, $state, $cookies, pokerboardService, $mdToast, groupService, profileService,
            APP_CONSTANTS,
        ) {
            const user = JSON.parse($cookies.get('user') || ("{}"));
            $scope.passNote = APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_VALIDATION;
            $scope.votes = [];
            const init = function () {
                profileService.getUser(user.id).then(response => {
                    $scope.email = response.email;
                    $scope.firstname = response.first_name;
                    $scope.lastname = response.last_name;
                });

                profileService.getVotes().then(response => {
                    $scope.votes = response;
                    console.log(response);
                }).catch(err => {
                    console.log(err);
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

                groupService.getGroups().then(response => {
                    $scope.groupList = [];
                    const parse = ele => {
                        $scope.groupList.push({
                            name: ele.name,
                            createdAt: new Date(ele.created_at).toLocaleDateString(),
                        });
                    }
                    response.forEach(parse);
                }, err => { })
            };

            init();

            $scope.onSubmit = () => {
                /* User is trying to change password or other data */
                const data = $scope.password == undefined ? { first_name: $scope.firstname, last_name: $scope.lastname } : { first_name: $scope.firstname, last_name: $scope.lastname, password: $scope.password };
                profileService.updateUser(user.id, data).then(response => {
                    $mdToast.show($mdToast.simple().textContent("Profile Update Successful"));
                }, error => {
                    $scope.errorMsg = error.data.password[0];
                });
            };
        }
    ]);
})()
