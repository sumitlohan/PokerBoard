'use strict';
(function () {
    angular.module("pokerPlanner").service('groupService', [
        'Restangular', 'APP_CONSTANTS',
        function(Restangular, APP_CONSTANTS) {
            this.getGroupDetails = (groupId) => {
                // get group details service
                return Restangular.one(APP_CONSTANTS.API_ENDPOINT.GROUPS, groupId).get();
            };
            this.createMember = (email, group) => {
                // create members in group service
                const user = {
                    email,
                    group
                }
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.CREATE_MEMBERS).post(user);
            }
            this.createGroup = (group) => {
                // create group service
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.GROUPS).post(group);
            };
            this.getGroups = () => {
                // get group list service
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.GROUPS).getList();
            };
    }]); 
})();
