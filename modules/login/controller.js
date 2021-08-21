'use strict';
(function () {
    angular.module('pokerPlanner').controller('loginCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'loginService',

        function (
          $scope, $rootScope, $state, $cookies, loginService
        ) {

            if($rootScope.isAuth)
                $state.go('pokerboard');

            $scope.redirectToSignup = () => {
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
                    $state.go('pokerboard');
                }, error => {
                    $scope.errorStatus = true;
                    $scope.errorMsg = "Invalid Email or Password"
                });
            }
        }
    ]);
})()
