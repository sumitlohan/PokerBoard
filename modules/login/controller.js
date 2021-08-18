'use strict';
(function () {
  angular.module('pokerPlanner').controller('loginCtrl', [
    '$scope',
    '$state',
    '$cookies',
    'loginService',

    function (
      $scope,
      $state,
      $cookies,
      loginService
    ) {

      $scope.redirect = function () {
        $scope.errorStatus = true;
        $scope.errorMsg = "This is a sample error";
      };

        if (form.$valid) {
          loginService.getUser({ email: $scope.email, password: $scope.password })
            .then(function (response) {
              $scope.errorStatus = false;
              $cookies.put('token', response.token);
              $cookies.put('first_name', response.first_name);
              $cookies.put('last_name', response.last_name);
              $cookies.put('email', response.email);
              
              // goto dashboard
            }, function (error) {
              $scope.errorStatus = true;
              $scope.errorMsg = "Invalid Email or Password"
            });
        }
      }
  ]);
}) ()
