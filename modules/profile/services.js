'use strict';
(function () {
    /**
     * Returns details of user(first_name, last_name, id, email) and token
     * Updates user profile
     */
    angular.module("pokerPlanner").service('profileService', ['Restangular', 'APP_CONSTANTS',
        function (Restangular, APP_CONSTANTS) {
            /**
             * Fetches user through user id
             * @param {Integer} id 
             * @returns user details
             */
            this.getUser = id => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.USER_PROFILE, id).get();
            };

            /**
             * Updates user through user id
             * @param {Integer} id 
             * @param {Object} data 
             * @returns user details
             */
            this.updateUser = function (id, data) {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.USER_PROFILE, id).customPATCH(data);
            };

            /**
             * Fetches votes of user
             * @returns user votes
             */
            this.getVotes = () => {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.GET_USER_VOTES).get();
            }
        }]);
})();
