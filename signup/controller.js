'use strict';
(function () {
    angular.module('pokerPlanner').controller('signupCtrl', [
        '$scope', 
        '$state', 
        'signupService',
    
        function(
          $scope, 
          $state,  
          signupService
        ) {
    
            $scope.isEmailError = false;
            $scope.isError = false;
            $scope.errorMsg = "";

            $scope.signup = function() {
              user = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password,
              }
    
              signupService.createUser(user).then(function(response) {
                // go to login
              }, function(error) {
                if(error.data.errors.email === "is already taken.") {
                  $scope.isEmailError = true;
                } else {
                  $scope.isError = true;
                  $scope.errorMsg = error;
                }
              })
            };
    
            $scope.goToLogin = function() {
              // go to login
            };
    }]);
    
})();
