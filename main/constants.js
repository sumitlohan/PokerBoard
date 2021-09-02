"use strict";
(function () {
    angular.module("pokerPlanner").constant("APP_CONSTANTS", {
        BASE_URL: config.BASE_URL,
        API_ENDPOINT: {
            SIGNUP: 'accounts/register',
            LOGIN: 'accounts/login',
        },
        ERROR_MESSAGES: {
            EMAIL: 'user with this email already exists.',
        },
    });
})();
