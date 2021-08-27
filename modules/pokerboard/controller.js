'use strict';
(function () {
    angular.module('pokerPlanner').controller('pokerboardCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'loginService',

        function (
          $scope, $rootScope, $state, $cookies, loginService
        ) {
            if(!$rootScope.isAuth) {
                $state.go('login');
            }

            $rootScope.user = JSON.parse($cookies.get('user') || ('{}'));
        }
    ]);
})()
