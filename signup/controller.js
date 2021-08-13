'use strict';
(function () {
    app.controller('signupCtrl', [
        '$scope', 
        '$state', 
        'signupService',
    
        function(
          $scope, 
          $state,  
          signupService
        ) {
    
            $scope.errorEmail = false;
    
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
                  $scope.errorEmail = true;
                }
              })
            };
    
            $scope.goToLogin = function() {
              // go to login
            };
    }]);
})();


app.directive('matchPass', function() {
  return {
    require: 'ngModel',
    scope: {
      confirmPassword: '=matchPass'
    },
    link: function (scope, element, attributes, paramval) {
      paramval.$validators.matchPass = function(val) {
        return val == scope.confirmPassword;
      };
      scope.$watch("confirmPassword", function() {
        paramval.$validate();
      });
    }
  };
});
