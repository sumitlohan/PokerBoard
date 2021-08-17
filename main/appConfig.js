'use strict';
(function () {
    angular.module("pokerPlanner").config( [
    '$stateProvider', 
    'RestangularProvider',
    'APP_CONSTANTS',

    function (
        $stateProvider, 
        RestangularProvider,
        APP_CONSTANTS,
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

        RestangularProvider.setBaseUrl(APP_CONSTANTS.BASE_URL);
        }   
    ]);
})();
