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
                })
            }
            $scope.credentialsChanged = function () {
                /* Hiding the displayed error if form is edit again */
                if($scope.prevEmail == $scope.email && $scope.prevPass == $scope.password){
                    $scope.isError = true;
                }else{
                    $scope.isError = false;
                }
            };

            $scope.onSubmit = () => {
                /* Atempt to login with given credentials */
                loginService.getUser({ email: $scope.email, password: $scope.password }).then(response => {
                    $scope.errorMsg = undefined;
                    $scope.isError = false;

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
                    $rootScope.user = user;
                    $cookies.put('user', JSON.stringify(user));

                    // TODO: $state.go('pokerboard');
                }, error => {
                    if ('email' in error.data){
                        /* If any occurs in email it will be handled below */
                        $scope.errorMsg = error.data.email[0];
                    }else if ('non_field_errors' in error.data){
                        /* If combination of email-pass does not match and
                        if account is not activated it will be handled below */
                        $scope.errorMsg = error.data.non_field_errors[0];
                    }else{
                        /* We are not supposed to get any other error */
                        $scope.errorMsg = "Unexpected error from server"
                    }
                    $scope.isError = true;
                    $scope.prevEmail = $scope.email;
                    $scope.prevPass = $scope.password;
                });
            }
        }
    ]);
})()
