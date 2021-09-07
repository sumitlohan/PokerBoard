'use strict';
(function () {
    /*Controller for voting session*/
    angular.module('pokerPlanner').controller('votingSessionCtrl', [
        '$scope', '$rootScope', '$state', 'votingSessionService', '$mdToast', 'APP_CONSTANTS', '$stateParams',
        function ($scope, $rootScope, $state, votingSessionService, $mdToast, APP_CONSTANTS, $stateParams) {
            const pokerboardId = $stateParams.id;
            var issueId = undefined;
            // $scope.voteList = [
            //     {
            //         name: "Siddhant Gupta",
            //         estimate: 5,
            //         short_name: ("Siddhant".charAt(0) + "Gupta".charAt(0)).toUpperCase()
            //     },
            //     {
            //         name: "Siddhant Gupta",
            //         estimate: 5,
            //         short_name: ("Siddhant".charAt(0) + "Gupta".charAt(0)).toUpperCase()
            //     },
            // ];
            const setCards = type => {
                switch (type) {
                    case "FIBONACCI": $scope.cardList = ['N', '?', 1, 2, 3, 5, 8, 13, 21, 34, 55];
                    case "SERIES": $scope.cardList = ['N', '?', 1, 2, 3, 4, 5, 6, 7, 8, 9];
                    case "EVEN": $scope.cardList = ['N', '?', 2, 4, 6, 8, 10, 12, 14, 16, 18];
                    case "ODD": $scope.cardList = ['N', '?', 1, 3, 5, 7, 9, 11, 13, 15, 17];
                }
            };

            const setIssueDetails = ticketId => {
                const query = "?jql=issue IN (" + ticketId + ")";
                issueId = ticketId;
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
                    if (response.status != "IN_PROGRESS") {
                        $state.go('404-page-not-found');
                    }
                    setSocketConnection(response.id);
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
            };

            init();

            $scope.postComment = () => {
                votingSessionService.postComment({ "issue": issueId, "comment": $scope.comment }).then(response => {
                    $mdToast.show($mdToast.simple().textContent(APP_CONSTANTS.SUCCESS_MESSAGES.COMMENT_ADDED));
                }, error => {
                    $mdToast.show($mdToast.simple().textContent(APP_CONSTANTS.ERROR_MESSAGES.COMMENT_POST_FAILED));
                });
            };

            const setParticipants = data => {
                $scope.participantList = [];
                data.users.forEach(parse);
                function parse(ele) {
                    $scope.participantList.push(ele.first_name + " " + ele.last_name);
                }
            }

            const setVotedUsers = data => {
                $scope.voteList = [];
                data.vote.forEach(parse);
                function parse(ele) {
                    $scope.participantList.push(ele.first_name + " " + ele.last_name);
                }
            }

            const setSocketConnection = sessionId => {
                var websocket = votingSessionService.wsConnect(sessionId);
                websocket.send({ "message": "Member Joined", "message_type": "initialise_game" });
                websocket.onMessage(function (message) {
                    const obj = JSON.parse(message.data);
                    switch (obj.type) {
                        case "initialise_game": setParticipants(obj);
                        case "estimate":
                        case "skip":
                        case "vote":
                        case "start_timer":
                    }
                });
            };

        }
    ]);
})()
