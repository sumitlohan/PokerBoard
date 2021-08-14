'use strict';
(function () {
    angular.module("pokerPlanner").service('signupService', [
        'Restangular', 
        
        function(
            Restangular
        ) {
            this.createUser = function(user) {
                return Restangular.all('account/api/register').post(user);
            };
    }]); 
})();
