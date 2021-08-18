'use strict';
(function () {
    angular.module('pokerPlanner').controller('loginCtrl', [
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
                $state.go('pokerboard')
            }

            
            $scope.redirect = () => {
                $state.go('signup');
            };

            $scope.onSubmit = () => {
                loginService.getUser({ email: $scope.email, password: $scope.password })
                .then(function (response) {
                    $scope.errorStatus = false;
                    $cookies.put('token', response.token);
                    $cookies.put('first_name', response.first_name);
                    $cookies.put('last_name', response.last_name);
                    $cookies.put('email', response.email);
                
                    $state.go('pokerboard')
                }, function (error) {
                    $scope.errorStatus = true;
                    $scope.errorMsg = "Invalid Email or Password"
                });
            }
            
            
        }
    ]);
})()
