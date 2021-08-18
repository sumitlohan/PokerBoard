'use strict';
(function () {
    /**
     * Returns details of user(first_name, last_name, id, email) and token(access, refresh))
     */
    angular.module("pokerPlanner").service('loginService', [
        'Restangular', 
        'APP_CONSTANTS',
        
        function(
            Restangular,
            APP_CONSTANTS
        ) {
            this.getUser = function(user) {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.LOGIN).post(user);
            };
    }]); 
})();
