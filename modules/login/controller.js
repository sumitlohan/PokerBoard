'use strict';
(function () {
    angular.module('pokerPlanner').controller('loginCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'loginService',
        function (
            $scope, $rootScope, $state, $cookies, loginService
        ) {
            $scope.redirectToSignup = () => {
                /* Redirect to signup page */
                $state.go('signup');
            };

            $scope.credentialsChanged = () => {
                /* Hiding the displayed error if form is edit again */
                $scope.errorMsg = undefined;
            };

            $scope.onSubmit = () => {
                /* Atempt to login with given credentials */
                loginService.getUser({ email: $scope.email, password: $scope.password }).then(response => {
                    $scope.errorMsg = undefined;
                    const user = {
                        token: response.token,
                        id: response.id,
                        first_name: response.first_name,
                        last_name: response.last_name,
                        email: response.email
                    }
                    $rootScope.isAuth = response.token;
                    $cookies.put('user', JSON.stringify(user));
                    $state.go('pokerboard');

                }, error => {
                    if(error.status === 400) {
                        $scope.isError = true;
                        $scope.errorMsg = "Invalid Email or Password"
                    }
                    $rootScope.user = user;
                    $cookies.put('user', JSON.stringify(user));
                    $state.go('pokerboard');
                }, error => {
                    $scope.errorMsg = error.data.non_field_errors[0];
                });
            }
        }
    ]);
})()
