'use strict';
(function () {
    angular.module('pokerPlanner').controller('loginCtrl', [
        '$scope', '$state', '$cookies', 'loginService',

        function (
          $scope, $state, $cookies, loginService
        ) {
            $scope.redirect = () => {
                $state.go('signup');
            };

            $scope.onSubmit = () => {
                loginService.getUser({ email: $scope.email, password: $scope.password })
                .then(response => {
                    $scope.errorStatus = false;

                    const user = {
                        token: response.token,
                        id: response.id,
                        first_name: response.first_name,
                        last_name: response.last_name,
                        email: response.email
                    }
                    $cookies.put('user', JSON.stringify(user));
                
                    // goto dashboard
                }, error => {
                    $scope.errorStatus = true;
                    $scope.errorMsg = "Invalid Email or Password"
                });
            }
        }
    ]);
})()
