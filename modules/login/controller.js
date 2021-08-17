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

      $scope.onSubmit = function (form) {
        if (form.$valid) {
          loginService.getUser({ email: $scope.email, password: $scope.password })
            .then(function (response) {
              $scope.errorStatus = false;
              $cookies.put('access_token', response.token.access);
              $cookies.put('refresh_token', response.token.refresh);
              console.log(response);
              // goto dashboard
            }, function (error) {
              $scope.errorStatus = true;
              $scope.errorMsg = "Invalid Email or Password"
            });
        }
      };

    }]);

})();
