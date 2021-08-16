'use strict';
(function () {
    angular.module("pokerPlanner").config( [
    '$stateProvider', 
    'RestangularProvider',

    function (
        $stateProvider, 
        RestangularProvider
    ) {
        var signupState = {
            name: 'signup',
            url: '/signup',
            templateUrl: '../signup/signup.html',
            controller: 'signupCtrl'
        };

        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: '../login/login.html',
            controller: 'loginCtrl'
        };

        $stateProvider.state(signupState);
        $stateProvider.state(loginState);

        var base_url = 'http://127.0.0.1:8000/api';
        RestangularProvider.setBaseUrl(base_url);
        }   
    ]);
})();
