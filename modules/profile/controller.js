'use strict';
(function () {
    angular.module('pokerPlanner').controller('profileCtrl', ['$scope', '$rootScope', '$state', '$cookies', 'profileService', 'APP_CONSTANTS',
        function ($scope, $rootScope, $state, $cookies, profileService, APP_CONSTANTS) {
            const user = JSON.parse($cookies.get('user') || ("{}"));
            $scope.passNote = APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_VALIDATION;
            const init = function () {
                profileService.getUser(user.id).then(response => {
                    $scope.email = response.email;
                    $scope.firstname = response.first_name;
                    $scope.lastname = response.last_name;
                });
            };

            init();

            $scope.onSubmit = () => {
                /* User is trying to change password or other data */
                const data = $scope.password == undefined ? {first_name: $scope.firstname, last_name: $scope.lastname} : {first_name: $scope.firstname, last_name: $scope.lastname, password: $scope.password};
                profileService.updateUser(user.id, data).then(response => {
                    // TODO: Show toast -- library implemented in other branches
                }, error => {
                    $scope.errorMsg = error.data.password[0];
                });
            };

            $scope.pokerboardList = [
                {
                    title: "Sample title",
                    description: "Sample description",
                    status: "STARTED",
                },
                {
                    title: "Sample title",
                    description: "Sample description",
                    status: "STARTED",
                },
                {
                    title: "Sample title",
                    description: "Sample description",
                    status: "STARTED",
                },
                {
                    title: "Sample title",
                    description: "Sample description",
                    status: "STARTED",
                },
                {
                    title: "Sample title",
                    description: "Sample description",
                    status: "STARTED",
                },
                {
                    title: "Sample title",
                    description: "Sample description",
                    status: "STARTED",
                },
            ];

            $scope.groupList = [
                {
                    name: "Sample name",
                    createdAt: "23-08-2018"
                },
                {
                    name: "Sample name",
                    createdAt: "23-08-2018"
                },
                {
                    name: "Sample name",
                    createdAt: "23-08-2018"
                },
                {
                    name: "Sample name",
                    createdAt: "23-08-2018"
                },
            ];
        }
    ]);
})()
