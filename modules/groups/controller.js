'use strict';
(function () {
  angular.module('pokerPlanner').controller('groupsCtrl', [
    '$scope',
    'groupsService',
    function (
      $scope,
      groupsService,
    ) {

      $scope.groups = [];
      $scope.groupName = "";
      $scope.createGroup = function () {
        groupsService.createGroup({name: $scope.groupName}).then(response=>{
          console.log(response);
          $scope.getGroups();
        })
        .catch(err=>{
          console.log(err);
        })
      }

      $scope.getGroups = function () {
        groupsService.getGroups().then(response=>{
          console.log(response);
          $scope.groups = response;
        })
        .catch(err=>{
          console.log(err);
        })
      }
      $scope.getGroups();

    }]);

})();
