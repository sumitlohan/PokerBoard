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
            templateUrl: '../signup/signup.html',
            controller: 'signupCtrl'
        }

        $stateProvider.state(signupState);

        RestangularProvider.setBaseUrl(config.BASE_URL);
        }   
    ]);
})();
