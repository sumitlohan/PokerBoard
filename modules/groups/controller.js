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
    }])
    .controller('groupCtrl', [
      '$scope', '$stateParams', 'groupsService',
      function ($scope, $stateParams, groupsService) {
          const id = $stateParams.id;
          $scope.addEmail = "";
  
          $scope.addMember = function () {
              groupsService.addMember($scope.addEmail, $scope.group.id).then(response=>{
                  $scope.getGroup();
              })
              .catch(err=>{});
          }
          $scope.getGroup = function () {
              groupsService.getGroup(id).then(response=>{
                  $scope.group = response;
              })
              .catch(err=>{});
          }
          $scope.getGroup();
          $scope.group = {};
      }]);;

})();
