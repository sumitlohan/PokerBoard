'use strict';
(function () {
    angular.module("pokerPlanner").config([
        '$stateProvider', '$urlRouterProvider', 'RestangularProvider', 
        'APP_CONSTANTS',

        function (
            $stateProvider, $urlRouterProvider, RestangularProvider, 
            APP_CONSTANTS,
        ) {
            $stateProvider
                .state('404-page-not-found', {
                    url: '/404-page-not-found',
                    templateUrl: 'modules/error_templates/404-page-not-found.html'
                })

                .state('500-internal-server-error', {
                    url: '/500-internal-server-error',
                    templateUrl: 'modules/error_templates/500-internal-server-error.html'
                })

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
                })

                .state('create-game', {
                    url: '/create-game',
                    templateUrl: 'modules/create-game/create-game.html',
                    controller: 'createGameCtrl'
                });

            $urlRouterProvider.otherwise("/404-page-not-found");
            
            RestangularProvider.setBaseUrl(APP_CONSTANTS.BASE_URL);
        }   
    ]);
})();
