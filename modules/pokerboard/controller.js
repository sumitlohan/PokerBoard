'use strict';
(function () {
    angular.module('pokerPlanner').controller('pokerboardCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'loginService',

        function (
          $scope, $rootScope, $state, $cookies, loginService
        ) {
            $rootScope.user = JSON.parse($cookies.get('user') || ('{}'));
        }
    ]);
})()
