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
            /**
             * Get pokerboard list 
             * @returns pokerboard list
             */
            this.getPokerboards = function(){
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.POKERBOARD).get();
            }

            /**
             * Fetches pokerboard through pokerboard id
             * @param {integer} pokerboardId 
             * @returns pokerboard details
             */
            this.getPokerboardDetails = pokerboardId => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.POKERBOARD, pokerboardId).get();
            }

            /**
             * Creates invite
             * @param {object} user 
             * @returns invitee details
             */
            this.inviteUser = user => {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.MEMBERS).post(user)
            }

            /**
             * Changes order of tickets
             * @param {object} tickets 
             * @param {integer} pokerboardId 
             * @returns order of tickets
             */
            this.orderTickets = (tickets, pokerboardId) => {
                return Restangular.one(`pokerboards/${pokerboardId}/order-tickets`).customPUT(tickets);
            }
    }]); 
})();
