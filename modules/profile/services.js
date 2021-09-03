'use strict';
(function () {
    /**
     * Returns details of user(first_name, last_name, id, email) and token
     * Updates user profile
     */
    angular.module("pokerPlanner").service ('profileService', ['Restangular', 'APP_CONSTANTS',        
        function (Restangular, APP_CONSTANTS) {
            this.getUser = id => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.USER_PROFILE, id).get();
            };

            this.updateUser = function(id, data) {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.USER_PROFILE, id).customPATCH(data);
            };
    }]); 
})();
