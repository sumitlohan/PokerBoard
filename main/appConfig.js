'use strict';
(function () {
    pokerPlanner.config( [
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
        }

        $stateProvider.state(signupState);

        var base_url = 'http://127.0.0.1:8000/api';
        RestangularProvider.setBaseUrl(base_url);
        }
    ]);
})();