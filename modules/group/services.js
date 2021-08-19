'use strict';
(function () {
    /**
     * Returns details of user(first_name, last_name, id, email) and token(access, refresh))
     */
    angular.module("pokerPlanner").service('groupService', [
        'Restangular', 
        'APP_CONSTANTS',
        
        function(
            Restangular,
            APP_CONSTANTS
        ) {
            this.getGroup = function(id) {
                
                const allGroups = Restangular.one(APP_CONSTANTS.API_ENDPOINT.GROUPS, id);
                return allGroups.get();
            };
            this.addMember = function (email, groupId) {
                const addMemberObj = Restangular.all(`${APP_CONSTANTS.API_ENDPOINT.GROUPS}${groupId}/create-members`);
                return addMemberObj.post({email: email});
            }
    }]); 
})();
