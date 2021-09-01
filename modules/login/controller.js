'use strict';
(function () {
    angular.module('pokerPlanner').controller('loginCtrl', ['$scope', '$rootScope', '$state', '$cookies', 
        'loginService',
        function ($scope, $rootScope, $state, $cookies, loginService) {

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
                    $rootScope.isAuth = response.token;
                    $rootScope.user = user;
                    $cookies.put('user', JSON.stringify(user));
                    $state.go('pokerboard');

                }, error => {
                    if(error.status === 400) {
                        $scope.isError = true;
                        $scope.errorMsg = "Invalid Email or Password"
                    }
                });
            }
        }
    ]);
})()
