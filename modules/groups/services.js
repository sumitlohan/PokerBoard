'use strict';
(function () {
    angular.module("pokerPlanner").service('groupsService', [
        'Restangular', 'APP_CONSTANTS',
        function(Restangular, APP_CONSTANTS) {
            this.createGroup = function(group) {
                const allGroups = Restangular.all(APP_CONSTANTS.API_ENDPOINT.GROUPS);
                const groupPr = allGroups.post(group);
                return groupPr;
            };
            this.getGroups = function() {
                const allGroups = Restangular.all(APP_CONSTANTS.API_ENDPOINT.GROUPS);
                const groups = allGroups.getList();
                return groups;
            };
    }]); 
})();
