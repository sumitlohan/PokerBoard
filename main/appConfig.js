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
            });

            RestangularProvider.setBaseUrl(APP_CONSTANTS.BASE_URL);
        }   
    ]);
})();
