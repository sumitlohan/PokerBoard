'use strict';
(function () {
    /**
     * Creates game session and get already created game sessions
     */
    angular.module("pokerPlanner").service('votingSessionService', [
        'Restangular', 'APP_CONSTANTS',
        
        function(
            Restangular, APP_CONSTANTS
        ) {
            /* Get active game session */
            this.getSession = pokerboardId => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.GAME_SESSION, pokerboardId).get();
            };

            /* Create game session */
            this.createSession = data => {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.GAME_SESSION).post(data);
            }
    }]); 
})();
