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
            GROUPS: 'groups/',
            CREATE_MEMBERS: 'groups/create-members',
        },
        ERROR_MESSAGES: {
            EMAIL: 'user with this email already exists.',
            INVALID_JQL: 'Invalid JQL Query',
            ATLEAST_TICKET: 'Please import atleast one ticket.'
        },
        ROUTES: {
            //access whether user is authenticated or not
            PUBLIC_ROUTES: ['404-page-not-found', '500-internal-server-error'],
            //acess only when user is not authenticated
            UNAUTH_ROUTES: ['login', 'signup'],
            //access only when user is authenticated
            AUTH_ROUTES: ['pokerboard'],
        },
        ERROR_ROUTES: {
            404: '404-page-not-found',
            500: '500-internal-server-error',
        }
    });
})();
