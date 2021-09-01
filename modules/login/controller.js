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
                        if ('email' in error.data){
                            $scope.errorMsg = error.data.email[0];
                        }else if ('non_field_errors' in error.data){
                            $scope.errorMsg = error.data.non_field_errors[0];
                        }
                        console.log(error.data);
                    }
                });
            }
        }
    ]);
})()
