'use strict';
(function () {
  angular.module('pokerPlanner').controller('groupsCtrl', [
    '$scope',
    '$state',
    'groupsService',

    function (
      $scope,
      $state,
      groupsService,
    ) {

      $scope.groups = [];
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
