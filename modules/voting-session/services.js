'use strict';
(function () {
    /**
     * Get already created game sessions
     */
    angular.module("pokerPlanner").service('votingSessionService', [
        'Restangular', 'APP_CONSTANTS',
        
        function(
            Restangular, APP_CONSTANTS
        ) {
            /**
             * Get game session
             * @param {*} ticketId 
             * @returns session details
             */
             this.getSession = ticketId => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.GAME_SESSION, ticketId).get();
            };

    }]); 
})();
