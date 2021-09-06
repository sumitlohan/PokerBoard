'use strict';
(function () {
    /**
     * Activate user account if the token is valid
     */
    angular.module("pokerPlanner").service('invitationService', [
        'Restangular', 'APP_CONSTANTS',
        
        function(
            Restangular, APP_CONSTANTS
        ) {
            this.acceptInvite = iid => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.INVITE, iid).customPUT();
            };
    }]); 
})();
