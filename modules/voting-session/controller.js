'use strict';
(function () {
    /*Controller for voting session*/
    angular.module('pokerPlanner').controller('votingSessionCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'votingSessionService', '$mdToast', 'APP_CONSTANTS', '$window', '$stateParams',
        function ($scope, $rootScope, $state, $cookies, votingSessionService, $mdToast, APP_CONSTANTS, $window, $stateParams) {
            $scope.cardList = ['N', '?', 1, 2, 3, 5, 8, 13, 21, 34, 55];
            $scope.participantList = ["Siddhant Gupta", "Prabhcharan Singh", "Rohit Jain"];

            const init = () => {
                votingSessionService.getSession($stateParams.id).then(response => {
                    console.log(response);
                }, error => {
                    $state.go('404-page-not-found');
                })
            }

            init();
        }
    ]);
})()
