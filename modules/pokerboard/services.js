'use strict';
(function () {
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
    }]); 
})();
