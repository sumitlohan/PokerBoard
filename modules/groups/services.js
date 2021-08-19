'use strict';
(function () {
    /**
     * Returns details of user(first_name, last_name, id, email) and token(access, refresh))
     */
    angular.module("pokerPlanner").service('groupsService', [
        'Restangular', 
        'APP_CONSTANTS',
        
        function(
            Restangular,
            APP_CONSTANTS
        ) {
            this.getGroups = function() {
                
                const allGroups = Restangular.all(APP_CONSTANTS.API_ENDPOINT.GROUPS);
                const groups = allGroups.getList();
                return groups;
            };
    }]); 
})();
