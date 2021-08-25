'use strict';
(function () {
    angular.module("pokerPlanner").service('groupListService', [
        'Restangular', 'APP_CONSTANTS',
        function(Restangular, APP_CONSTANTS) {
            this.createGroup = function(group) {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.GROUPS).post(group);
            };
            this.getGroups = function() {
                return Restangular.all(APP_CONSTANTS.API_ENDPOINT.GROUPS).getList();
            };
    }]); 
})();
