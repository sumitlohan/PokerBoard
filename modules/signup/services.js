'use strict';
(function () {
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
