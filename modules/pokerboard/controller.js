'use strict';
(function () {
    angular.module('pokerPlanner').controller('pokerboardCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$cookies',
        'loginService',

        function (
          $scope,
          $rootScope,
          $state,
          $cookies,
          loginService
        ) {
            if ($cookies.get('token')) {
                $rootScope.isAuth = true;
            } else {
                $rootScope.isAuth = false;
                $state.go('login');
            }

            $rootScope.user = $cookies.get('first_name')
        }
    ]);
})()
