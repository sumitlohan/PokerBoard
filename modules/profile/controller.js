'use strict';
(function () {
    angular.module('pokerPlanner').controller('profileCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', '$mdToast', 'profileService', 'APP_CONSTANTS',
        function (
            $scope, $rootScope, $state, $cookies, $mdToast, profileService, APP_CONSTANTS,
        ) {
            $scope.passNote = APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_VALIDATION;
            $scope.votes = [];
            const init = function () {
                profileService.getUser($rootScope.user.id).then(response => {
                    $scope.groupList = [];
                    $scope.pokerboardList = [];
                    $scope.email = response.email;
                    $scope.firstname = response.first_name;
                    $scope.lastname = response.last_name;
                    $scope.votes = response.votes;
                    const parsePokerboard = ele => {
                        $scope.pokerboardList.push({
                            title: ele.title,
                            description: ele.description,
                            status: APP_CONSTANTS.POKERBOARD_STATUS[ele.status],
                        });
                    }
                    const parseGroup = ele => {
                        $scope.groupList.push({
                            name: ele.name,
                            createdAt: new Date(ele.created_at).toLocaleDateString(),
                        });
                    }
                    response.pokerboards.forEach(parsePokerboard);
                    response.groups.forEach(parseGroup);
                });

                // Gets estimation time and ticket_id for all tickets estimated by current user
                profileService.getEstimationTime().then(response => {
                    $scope.estimations = response;
                    var time = []
                    for(let i=0; i<$scope.estimations.length; i++) {
                        time.push(parseInt($scope.estimations[i].estimation_time))
                    }
                    const sum = time.reduce((a, b) =>  a + b, 0);
                    $scope.avg_time = sum/time.length;
                    $scope.max_time = time.reduce((a, b) => (a > b) ? a : b);
                    $scope.min_time = time.reduce((a, b) => (a < b) ? a : b);
                });
            };

            init();

            $scope.onSubmit = () => {
                /* User is trying to change password or other data */
                const data = !$scope.password ? { first_name: $scope.firstname, last_name: $scope.lastname } : { first_name: $scope.firstname, last_name: $scope.lastname, password: CryptoJS.SHA256($scope.password).toString() };
                profileService.updateUser($rootScope.user.id, data).then(response => {
                    $mdToast.show($mdToast.simple().textContent("Profile Update Successful"));
                }, error => {
                    $scope.errorMsg = error.data.password[0];
                });
            };
        }
    ]);
})()
