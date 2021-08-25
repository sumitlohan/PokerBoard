'use strict';
(function () {
    angular.module('pokerPlanner').controller('groupListCtrl', [
        '$scope', 'groupListService',
        function ($scope, groupListService) {
            $scope.groups = [];
            $scope.groupName = "";
            $scope.createGroup = function () {
                groupListService.createGroup({name: $scope.groupName}).then(response=>{
                  $scope.getGroups();
                })
                .catch(err=>{})
            }

            $scope.getGroups = function () {
                groupListService.getGroups().then(response=>{
                  $scope.groups = response;
                })
                .catch(err=>{})
            }
            $scope.getGroups();
        }]);

})();
