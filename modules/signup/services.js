'use strict';
(function () {
    /**
     * Creates user and returns details of user(first_name, last_name, email) and token(access, refresh))
     */
    angular.module("pokerPlanner").service('signupService', [
        'Restangular', 
        'APP_CONSTANTS',
        
        function(
            Restangular,
            APP_CONSTANTS
        ) {
            this.createUser = function(user) {
                return Restangular.all(APP_CONSTANTS.SIGNUP).post(user);
            };
    }]); 
})();
