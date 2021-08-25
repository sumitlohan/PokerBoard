'use strict';
(function () {
    angular.module("pokerPlanner").service('groupService', [
        'Restangular', 'APP_CONSTANTS',
        function(Restangular, APP_CONSTANTS) {
            this.getGroup = function(id) {
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.GROUPS, id).get();
            };
            this.addMember = function (email, group) {
                const user = {
                    email,
                    group
                }
                return Restangular.all(`${APP_CONSTANTS.API_ENDPOINT.GROUPS}/create-members`).post(user);
            }
    }]); 
})();
