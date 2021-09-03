'use strict';
(function () {
    angular.module('pokerPlanner').controller('profileCtrl', ['$scope', '$rootScope', '$state', '$cookies', 'profileService',
        function ($scope, $rootScope, $state, $cookies, profileService) {
            const user = JSON.parse($cookies.get('user') || ("{}"));
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
                // const data = $scope.password == undefined ? {first_name: $scope.firstname, last_name: $scope.lastname} : {first_name: $scope.firstname, last_name: $scope.lastname, password: $scope.password};
                // profileService.updateUser(user.id, data).then(response => {
                //     $rootScope.profileUpdated = true;
                // }, error => {
                //     $scope.errorMsg = error.data.password[0];
                // });
                $rootScope.profileUpdated = true;
            };
        }
    ]);
})()
