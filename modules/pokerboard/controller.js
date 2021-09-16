'use strict';
(function () {
    angular.module('pokerPlanner').controller('pokerboardCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'pokerboardService', 'APP_CONSTANTS',
        function (
            $scope, $rootScope, $state, $cookies, pokerboardService, APP_CONSTANTS
        ) {
            const init = () => {
                pokerboardService.getPokerboards().then(response => {
                    $scope.boardList = [];
                    const parse = ele => {
                        $scope.boardList.push({
                            title: ele.title,
                            state: APP_CONSTANTS.POKERBOARD_STATUS[ele.status],
                            date: new Date(ele.created_at).toLocaleDateString(),
                            creator: ele.manager.first_name + " " + ele.manager.last_name,
                        });
                    }
                    response.forEach(parse);
                });
            };

            init();
                
            $scope.redirect = function () {
                $state.go('create-game');
            };
        }
    ]);
})()
