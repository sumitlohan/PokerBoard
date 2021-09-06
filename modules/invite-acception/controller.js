'use strict';
(function () {
    angular.module('pokerPlanner').controller('invitationCtrl', [
        '$scope', '$state', 'invitationService', '$stateParams',

        function (
            $scope, $state, invitationService, $stateParams
        ) {
            $scope.goToLogin = () => {
                $state.go('login');
            };
            
            invitationService.acceptInvite($stateParams.iid)
                .then(response => {
                    $scope.statusMsg = 'Invitation accepted';
                }, error => {
                    $scope.statusMsg = 'Invalid request';
                });
        }
    ]);
})()
