'use strict';
(function () {
    /**
     * Creates game with user specified conditions
     */
    angular.module("pokerPlanner").service('createGameService', [
        'Restangular', 'APP_CONSTANTS',
        
        function(
            Restangular, APP_CONSTANTS
        ) {
            this.getSuggestions = function(){
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.SUGGESTIONS).get();
            };

            this.getTickets = function(query){
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.JQL + query).get();
            };

            this.createGame = function(data){
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.POKERBOARD).post(data);
            };
    }]); 
})();
