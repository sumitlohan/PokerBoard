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
        }

        $stateProvider.state(signupState);

        RestangularProvider.setBaseUrl(APP_CONSTANTS.BASE_URL);
        }   
    ]);
})();
