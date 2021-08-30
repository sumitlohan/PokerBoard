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
    }]); 
})();
