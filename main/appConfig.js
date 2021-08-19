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
                })
                .state("groups", {
                    url: "/groups",
                    templateUrl: "modules/groups/groups.html",
                    controller: "groupsCtrl",
                })
                .state("group", {
                    url: "/groups/:id",
                    templateUrl: "modules/group/group.html",
                    controller: "groupCtrl",
                });

            RestangularProvider.setBaseUrl(APP_CONSTANTS.BASE_URL);
        }   
    ]);
})();
