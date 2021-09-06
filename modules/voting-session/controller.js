'use strict';
(function () {
    /*Controller for voting session*/
    angular.module('pokerPlanner').controller('votingSessionCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'votingSessionService', '$mdToast', 'APP_CONSTANTS', '$window', '$stateParams',
        function ($scope, $rootScope, $state, $cookies, votingSessionService, $mdToast, APP_CONSTANTS, $window, $stateParams) {
            $scope.participantList = ["Siddhant Gupta", "Prabhcharan Singh", "Rohit Jain"];
            const pokerboardId = $stateParams.id;
            const setCards = type => {
                switch(type){
                    case "FIBONACCI": $scope.cardList = ['N', '?', 1, 2, 3, 5, 8, 13, 21, 34, 55];
                    case "SERIES": $scope.cardList = ['N', '?', 1, 2, 3, 4, 5, 6, 7, 8, 9];
                    case "EVEN": $scope.cardList = ['N', '?', 2, 4, 6, 8, 10, 12, 14, 16, 18];
                    case "ODD": $scope.cardList = ['N', '?', 1, 3, 5, 7, 9, 11, 13, 15, 17];
                }
            };

            const setIssueDetails = ticketId => {
                const query = "?jql=issue IN (" + ticketId + ")";
                votingSessionService.getIssue(query).then(response => {
                    $scope.issueTitle = ticketId + ": " + response.issues[0].fields.summary;
                    $scope.issueDescription = response.issues[0].fields.description;
                    $scope.labelList = response.issues[0].fields.labels;
                }, error => {
                    $state.go('404-page-not-found');
                });
            };

            const init = () => {
                votingSessionService.getSession(pokerboardId).then(response => {
                    if(response.status != "IN_PROGRESS"){
                        $state.go('404-page-not-found');
                    }
                    setIssueDetails(response.ticket.ticket_id);
                }, error => {
                    $state.go('404-page-not-found');
                });

                votingSessionService.getPokerboardDetails(pokerboardId).then(response => {
                    $scope.duration = response.duration;
                    $scope.title = response.title;
                    $scope.description = response.description;
                    setCards(response.estimation_type);
                }, error => {
                    $state.go('404-page-not-found');
                });

            }

            init();
        }
    ]);
})()
