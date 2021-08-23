'use strict';
(function () {
    angular.module("pokerPlanner").service('groupService', [
        'Restangular', 'APP_CONSTANTS',
        function(Restangular, APP_CONSTANTS) {
            this.getGroup = function(id) {
                
                const allGroups = Restangular.one(APP_CONSTANTS.API_ENDPOINT.GROUPS, id);
                return allGroups.get();
            };
            this.addMember = function (email, groupId) {
                const user = {
                    email: email
                }
                return Restangular.all(`${APP_CONSTANTS.API_ENDPOINT.GROUPS}${groupId}/create-members`).post(user);
            }
    }]); 
})();
