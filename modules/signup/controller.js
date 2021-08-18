'use strict';
(function () {
    /**
     * Controller for signup
     */
    angular.module('pokerPlanner').controller('signupCtrl', [
        '$scope', 
        '$rootScope',
        '$state',
        '$cookies',
        'signupService',
        'APP_CONSTANTS',
    
        function(
            $scope, 
            $rootScope,
            $state,  
            $cookies,
            signupService,
            APP_CONSTANTS
        ) {

            $scope.showError = false;

            if ($cookies.get('token')) {
                $rootScope.isAuth = true;
                $state.go('pokerboard');
            }

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
                    $cookies.put('first_name', response.first_name);
                    $cookies.put('last_name', response.last_name);
                    $cookies.put('email', response.email);
                    
                    $state.go('pokerboard')
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
