"use strict";
(function () {
    angular.module("pokerPlanner").constant("APP_CONSTANTS", {
        BASE_URL: config.BASE_URL,
        API_ENDPOINT: {
            SIGNUP: 'api/accounts/register',
            LOGIN: 'api/accounts/login',
        },
        ERRORS: {
            EMAIL: 'user with this email already exists.',
        },
    });
})();
