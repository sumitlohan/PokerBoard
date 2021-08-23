'use strict';
(function () {
  angular.module('pokerPlanner').controller('groupsCtrl', [
    '$scope', 'groupsService',
    function ($scope, groupsService) {
      $scope.groups = [];
      $scope.groupName = "";
      $scope.createGroup = function () {
        groupsService.createGroup({name: $scope.groupName}).then(response=>{
          $scope.getGroups();
        })
        .catch(err=>{})
      }

      $scope.getGroups = function () {
        groupsService.getGroups().then(response=>{
          $scope.groups = response;
        })
        .catch(err=>{})
      }
      $scope.getGroups();
    }]);

})();
