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
                });

            RestangularProvider.setBaseUrl(APP_CONSTANTS.BASE_URL);
        }   
    ]);
})();
