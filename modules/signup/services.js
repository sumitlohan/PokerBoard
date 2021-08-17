'use strict';
(function () {
    angular.module("pokerPlanner").service('signupService', [
        'Restangular', 
        'config',
        
        function(
            Restangular,
            config
        ) {
            this.createUser = function(user) {
                return Restangular.all(config.signup).post(user);
            };
    }]); 
})();
