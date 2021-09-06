'use strict';
(function () {
    /*Controller for voting session*/
    angular.module('pokerPlanner').controller('votingSessionCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'votingSessionService', '$mdToast', 'APP_CONSTANTS', '$window',
        function ($scope, $rootScope, $state, $cookies, votingSessionService, $mdToast, APP_CONSTANTS, $window) {
            $scope.cardList = ['N', '?', 1, 2, 3, 5, 8, 13, 21, 34, 55];
            $scope.participantList = ["Siddhant Gupta", "Prabhcharan Singh", "Rohit Jain"];
        }
    ]);
})()
