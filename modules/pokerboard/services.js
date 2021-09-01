'use strict';
(function () {
    /**
     * Returns list of pokerboards
     */
    angular.module("pokerPlanner").service('pokerboardService', [
        'Restangular', 'APP_CONSTANTS',
        
        function(
            Restangular, APP_CONSTANTS
        ) {
            this.getPokerboards = function(){
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.POKERBOARD).get();
            }

            // this.getTickets = () => {
            //     return Restangular.one(APP_CONSTANTS.API_ENDPOINT.TICKETS).get();
            // }

            this.getPokerboardDetails = pokerboardId => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.POKERBOARD, pokerboardId).get();
            }

            this.inviteUser = user => {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.INVITE).post(user)
            }
    }]); 
})();
