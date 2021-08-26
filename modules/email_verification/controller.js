'use strict';
(function () {
    angular.module('pokerPlanner').controller('emailCtrl', [
        '$scope', '$state', '$cookies', 'emailService', '$stateParams',

        function (
            $scope, $state, $cookies, emailService, $stateParams
        ) {
            $scope.goToLogin = () => {
                $state.go('login');
            };
            
            emailService.activateAccount($stateParams.uid, {'token': $stateParams.token})
                .then(response => {
                    $scope.statusMsg = 'Account activated successfully';
                }, error => {
                    $scope.statusMsg = 'Invalid email activation link';
                });
        }
    ]);
})()
