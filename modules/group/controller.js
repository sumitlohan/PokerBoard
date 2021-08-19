'use strict';
(function () {
  angular.module('pokerPlanner').controller('groupCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'groupService',

    function (
      $scope,
      $state,
      $stateParams,
      groupService,
    ) {
        const id = $stateParams.id;
        $scope.addEmail = "";

        $scope.addMember = function () {
            groupService.addMember($scope.addEmail, $scope.group.id).then(response=>{
                $scope.getGroup();
            })
            .catch(err=>{
                console.log(err);
            });
        }
        $scope.getGroup = function () {
            groupService.getGroup(id).then(response=>{
                $scope.group = response;
            })
            .catch(err=>{
                console.log(err);
            });
        }
        $scope.getGroup();
      $scope.group = {id: 1, name: "G1"}
    }]);
})();
