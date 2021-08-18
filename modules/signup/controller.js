'use strict';
(function () {
    /**
     * Controller for signup
     */
    angular.module('pokerPlanner').controller('signupCtrl', [
        '$scope', 
        '$state',
        '$cookies',
        'signupService',
        'APP_CONSTANTS',
    
        function(
            $scope, 
            $state,  
            $cookies,
            signupService,
            APP_CONSTANTS
        ) {

            $scope.showError = false;

            /**
             * Checks if email already exists
             */ 
            $scope.isEmailError = () => {
                if($scope.existingEmail === $scope.email)
                    $scope.showError = true;
                else
                    $scope.showError = false;
            };

            $scope.signup = function() {
                const user = {
                    first_name: $scope.firstName,
                    last_name: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password
                }

                signupService.createUser(user).then(function(response) {
                    $cookies.put('token', response.token);
                    // go to dashboard
                }, function(error) {
                    if(error.data.email[0] === APP_CONSTANTS.ERRORS.EMAIL) {
                        $scope.existingEmail = $scope.email;
                        $scope.isEmailError();
                    }
                })
            };
    
            $scope.goToLogin = function() {
                $state.go('login');
            };
    }]);
})();
