'use strict';
(function () {
    /**
     * Controller for signup
     */
    angular.module('pokerPlanner').controller('signupCtrl', [
        '$scope', '$rootScope', '$state', 'signupService', 'APP_CONSTANTS',

        function(
            $scope, $rootScope, $state, signupService, APP_CONSTANTS
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

            $scope.signup = () => {
                const user = {
                    first_name: $scope.firstName,
                    last_name: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password
                }

                signupService.createUser(user).then(response => {
                    $rootScope.signedUp = true;
                    $state.go('login');
                }, error => {
                    if(error.data.email[0] === APP_CONSTANTS.ERROR_MESSAGES.EMAIL) {
                        $scope.existingEmail = $scope.email;
                        $scope.isEmailError();
                    }
                })
            };
    
            $scope.goToLogin = () => {
                $state.go('login');
            };
    }]);
})();
