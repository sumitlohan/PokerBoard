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

            /**
             * Fetches pokerboard through pokerboard id
             * @param {*} pokerboardId 
             * @returns pokerboard details
             */
            this.getPokerboardDetails = pokerboardId => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.POKERBOARD, pokerboardId).get();
            }

            /**
             * Creates invite
             * @param {*} user 
             * @returns invitee details
             */
            this.inviteUser = user => {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.INVITE).post(user)
            }

            /**
             * Creates invite
             * @param {*} data 
             * @returns session details
             */
            this.createSession = data => {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.GAME_SESSION).post(data);
            }
    }]); 
})();
