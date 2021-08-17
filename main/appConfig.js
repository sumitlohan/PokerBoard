'use strict';
(function () {
    angular.module("pokerPlanner").config( [
    '$stateProvider', 
    'RestangularProvider',
    'config',

    function (
        $stateProvider, 
        RestangularProvider,
        config,
    ) {
        var signupState = {
            name: 'signup',
            url: '/signup',
            templateUrl: '../modules/signup/signup.html',
            controller: 'signupCtrl'
        };

        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: '../modules/login/login.html',
            controller: 'loginCtrl'
        };

        $stateProvider.state(signupState);
        $stateProvider.state(loginState);

        RestangularProvider.setBaseUrl(config.BASE_URL);
        }   
    ]);
})();
