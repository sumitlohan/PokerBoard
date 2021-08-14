'use strict';
(function () {
    angular.module('pokerPlanner').controller('signupCtrl', [
        '$scope', 
        '$state',
        '$cookies',
        'signupService',
    
        function(
          $scope, 
          $state,  
          $cookies,
          signupService,
        ) {
            $scope.isEmail = "";
            $scope.isEmailError = function() {
              return ($scope.isEmail === $scope.email);
            };

            $scope.signup = function() {
              const user = {
                first_name: $scope.firstName,
                last_name: $scope.lastName,
                email: $scope.email,
                password: $scope.password,
              }
    
              signupService.createUser(user).then(function(response) {
                $cookies.put('access_token', response.token.access)
                $cookies.put('refresh_token', response.token.refresh);
                // go to dashboard
              }, function(error) {
                if(error.data.email[0] === "user with this email already exists.") {
                  $scope.isEmail = $scope.email;
                }
              })
            };
    
            $scope.goToLogin = function() {
              // go to login
            };
    }]);
    
})();
