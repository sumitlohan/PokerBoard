"use strict";
(function () {
    angular.module("pokerPlanner").constant("APP_CONSTANTS", {
        BASE_URL: config.BASE_URL,
        WS_BASE_URL: config.WS_BASE_URL,
        API_ENDPOINT: {
            SIGNUP: 'accounts/register',
            LOGIN: 'accounts/login',
            POKERBOARD: 'pokerboards/',
            SUGGESTIONS: 'pokerboards/suggestions',
            JQL: 'pokerboards/jql',
            INVITE: 'invite',
            GAME_SESSION: 'pokerboards/game',
            COMMENT: 'pokerboards/comment',
        },
        ERROR_MESSAGES: {
            EMAIL: 'user with this email already exists.',
            INVALID_JQL: 'Invalid JQL Query',
            ATLEAST_TICKET: 'Please import atleast one ticket.',
            USER_ALREADY_INVITED: 'User already invited',
            GROUP_ALREADY_INVITED: 'Group already invited',
            GROUP_DOES_NOT_EXIST: 'Group does not exist',
            COMMENT_POST_FAILED: 'Failed to post comment',
        },
        SUCCESS_MESSAGES: {
            COMMENT_ADDED: 'Comment added successfully',
        },
        DECK_TYPE: {
            FIBONACCI: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55],
            SERIES: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            EVEN: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
            ODD: [0, 1, 3, 5, 7, 9, 11, 13, 15, 17],
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
        }
    });
})();
