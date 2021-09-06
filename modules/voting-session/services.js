'use strict';
(function () {
    /**
     * Get already created game sessions
     */
    angular.module("pokerPlanner").service('votingSessionService', [
        'Restangular', 'APP_CONSTANTS',

        function (
            Restangular, APP_CONSTANTS
        ) {
            /**
             * Get game session
             * @param {*} pokerboardId 
             * @returns session details
             */
            this.getSession = pokerboardId => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.GAME_SESSION, pokerboardId).get();
            };

            /**
             * Fetches pokerboard through pokerboard id
             * @param {*} pokerboardId 
             * @returns pokerboard details
             */
            this.getPokerboardDetails = pokerboardId => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.POKERBOARD, pokerboardId).get();
            }

            /**
             * Fetches JIRA issue from ticketID
             * @param {*} query
             * @returns JIRA issue details
             */
             this.getIssue = query => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.JQL + query).get();
            }

        }]);
})();
