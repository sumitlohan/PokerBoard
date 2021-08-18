'use strict';
(function () {
    angular.module("pokerPlanner").config([
        '$stateProvider', 
        'RestangularProvider',
        'APP_CONSTANTS',

        function (
            $stateProvider, 
            RestangularProvider,
            APP_CONSTANTS,
        ) {
            $stateProvider
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'modules/signup/signup.html',
                    controller: 'signupCtrl'
                })

                .state('login', {
                    url: '/login',
                    templateUrl: 'modules/login/login.html',
                    controller: 'loginCtrl'
                })

                .state('pokerboard', {
                    url: '/',
                    templateUrl: 'modules/pokerboard/pokerboard.html',
                    controller: 'pokerboardCtrl'
                });

            RestangularProvider.setBaseUrl(APP_CONSTANTS.BASE_URL);
        }   
    ]);
})();
