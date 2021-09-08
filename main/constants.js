"use strict";
(function () {
    angular.module("pokerPlanner").constant("APP_CONSTANTS", {
        BASE_URL: config.BASE_URL,
        API_ENDPOINT: {
            SIGNUP: 'accounts/register',
            LOGIN: 'accounts/login',
            POKERBOARD: 'pokerboards/',
            SUGGESTIONS: 'pokerboards/suggestions',
            JQL: 'pokerboards/jql',
            ACCOUNT_ACTIVATE: 'accounts/activate/',
        },
        ERROR_MESSAGES: {
            EMAIL: 'user with this email already exists.',
            INVALID_JQL: 'Invalid JQL Query',
            ATLEAST_TICKET: 'Please import atleast one ticket.',
            PASSWORD_VALIDATION: `Password must be of minimum 8 characters, 
            at least one uppercase letter, lowercase letter, number and special character`,
        },
        ROUTES: {
            //access whether user is authenticated or not
            PUBLIC_ROUTES: ['404-page-not-found', '500-internal-server-error'],
            //acess only when user is not authenticated
            UNAUTH_ROUTES: ['login', 'signup']
        },
        ERROR_ROUTES: {
            404: '404-page-not-found',
            500: '500-internal-server-error',
        },
        POKERBOARD_STATUS: {
            1: 'Started',
            2: 'Ended'
        }
    });
})();
