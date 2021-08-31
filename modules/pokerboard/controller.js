'use strict';
(function () {
    angular.module('pokerPlanner').controller('pokerboardCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'pokerboardService',

        function (
            $scope, $rootScope, $state, $cookies, pokerboardService
        ) {
            $rootScope.user = JSON.parse($cookies.get('user') || ('{}'));
            pokerboardService.getPokerboards().then(response => {
                $scope.boardList = [];
                response.forEach(parse);
                function parse(ele) {
                    $scope.boardList.push({
                        title: ele.title,
                        state: ele.status,
                        date: new Date(ele.created_at).toLocaleDateString(),
                        creator: ele.manager.first_name + ele.manager.last_name,
                    });
                }
            });

            $scope.redirect = function () {
                $state.go('create-game');
            };
        }
    ]);
})()
