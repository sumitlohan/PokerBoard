'use strict';
(function () {
    angular.module("pokerPlanner").service('groupService', [
        'Restangular', 'APP_CONSTANTS',
        function(Restangular, APP_CONSTANTS) {
            this.getGroup = function(id) {
                
                const allGroups = Restangular.one(APP_CONSTANTS.API_ENDPOINT.GROUPS, id);
                return allGroups.get();
            };
            this.addMember = function (email, group) {
                const user = {
                    email: email,
                    group
                }
                return Restangular.all(`${APP_CONSTANTS.API_ENDPOINT.GROUPS}/create-members`).post(user);
            }
    }]); 
})();
