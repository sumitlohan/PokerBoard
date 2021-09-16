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
            USER_PROFILE: 'accounts/user/',
            GROUPS: 'groups/',
            CREATE_MEMBERS: 'groups/create-members',
            ACCOUNT_ACTIVATE: 'accounts/activate/',
        },
        ERROR_MESSAGES: {
            EMAIL: 'user with this email already exists.',
            INVALID_JQL: 'Invalid JQL Query',
            PASSWORD_VALIDATION: `Password must be of minimum 8 characters, 
            at least one uppercase letter, lowercase letter, number and special character`,
        },
        POKERBOARD_STATUS: {
            1: 'STARTED',
            2: 'ENDED'
        },
        DECK_NAME: {
            1: 'Serial',
            2: 'Even',
            3: 'Odd',
            4: 'Fibonacci',
        },
        DEFAULT_DECK_OPTION: {
            SERIAL: '1',
        },
        DECK_TYPE: {
            1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            2: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
            3: [0, 1, 3, 5, 7, 9, 11, 13, 15, 17],
            4: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55],
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
            1: 'Created',
            2: 'Started',
            3: 'Ended',
        }
    });
})();
